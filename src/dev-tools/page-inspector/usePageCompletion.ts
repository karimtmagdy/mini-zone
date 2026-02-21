import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { PageCompletionResult, PageRegressionInfo } from './types';
import { analyzePage } from './pageAnalyzer.utils';
import { usePageHistory } from './usePageHistory';

/** Module-level cache: last stable result per route (survives re-renders, not refreshes) */
const routeCache = new Map<string, PageCompletionResult>();

export function usePageCompletion() {
  const location = useLocation();
  const { addEntry, getLatestScore, getPersistedRegression } = usePageHistory();

  const [result, setResult] = useState<PageCompletionResult | null>(
    () => routeCache.get(location.pathname) ?? null
  );

  /**
   * Initialize lastScan from persisted storage so regression survives page refresh.
   * On route change this re-initializes from the new path's stored regression.
   */
  const [lastScan, setLastScan] = useState<PageRegressionInfo | null>(
    () => getPersistedRegression(location.pathname) ?? null
  );

  // When the route changes, seed lastScan from the stored regression for the new path
  useEffect(() => {
    setLastScan(getPersistedRegression(location.pathname) ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const calculateScore = useCallback(() => {
    const categories = analyzePage();

    const totalScore = Math.round(
      Object.entries(categories).reduce((acc, [, cat]) => acc + cat.score, 0)
    );

    /**
     * CRITICAL: Read the previous score BEFORE calling addEntry.
     * Once addEntry runs, getLatestScore() will return the NEW score,
     * making regression detection impossible.
     */
    const prevScore = getLatestScore(location.pathname);

    // Build regression info at the moment of calculation
    let regression: PageRegressionInfo | undefined;
    if (prevScore !== undefined) {
      if (totalScore < prevScore) {
        regression = { type: 'regression', diff: prevScore - totalScore, previousScore: prevScore };
      } else if (totalScore > prevScore) {
        regression = { type: 'improvement', diff: totalScore - prevScore, previousScore: prevScore };
      } else {
        regression = { type: 'stable', diff: 0, previousScore: prevScore };
      }
    }

    const finalResult: PageCompletionResult = {
      path: location.pathname,
      totalScore,
      categories,
      timestamp: Date.now(),
      regression,
    };

    // Store in module cache for instant hydration on re-render
    routeCache.set(location.pathname, finalResult);

    setResult(finalResult);

    // Only update lastScan on an actual change — stable results are silent
    // This ensures regression/improvement persists until replaced by a new one
    if (regression && regression.type !== 'stable') {
      setLastScan(regression);
    }
    // stable → leave lastScan untouched (previous regression/improvement stays visible)
    // undefined prevScore (first visit) → leave lastScan untouched

    // Save to history WITH the regression snapshot so it persists to localStorage
    // Note: for stable results, regression is still passed so the entry is accurate
    addEntry(location.pathname, totalScore, regression);
  }, [location.pathname, addEntry, getLatestScore]);

  // Auto-scan on route change and on DOM mutations
  useEffect(() => {
    const timer = setTimeout(calculateScore, 600);

    let mutationTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(calculateScore, 1000);
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(mutationTimer);
      observer.disconnect();
    };
  }, [calculateScore]);

  return {
    result,
    recalculate: calculateScore,
    lastScan,
  };
}
