import { useState, useCallback, useEffect, useRef } from 'react';
import type { PageHistoryEntry, PageRegressionInfo } from './types';

const STORAGE_KEY = 'dev_page_inspector_history';
const MAX_HISTORY = 10;

export function usePageHistory() {
  const [history, setHistory] = useState<PageHistoryEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const isInitialMount = useRef(true);

  // Debounced persistence to localStorage
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const handler = setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      }
    }, 800);
    return () => clearTimeout(handler);
  }, [history]);

  /**
   * Returns the latest score for a given path (history[0] for that path).
   * Used to compare BEFORE saving a new entry.
   */
  const getLatestScore = useCallback((path: string): number | undefined => {
    return history.find(e => e.path === path)?.score;
  }, [history]);

  /**
   * Returns the persisted regression info from the most recent entry for this path.
   * This is the ground truth — read from storage, not derived at render time.
   */
  const getPersistedRegression = useCallback((path: string): PageRegressionInfo | undefined => {
    return history.find(e => e.path === path)?.regression;
  }, [history]);

  /**
   * Save a new score for a path, capturing regression info AT the moment of save
   * (before the new entry is prepended and shifts the history window).
   */
  const addEntry = useCallback((path: string, score: number, regression?: PageRegressionInfo) => {
    setHistory(prev => {
      const newEntry: PageHistoryEntry = { path, score, timestamp: Date.now(), regression };
      return [newEntry, ...prev].slice(0, MAX_HISTORY);
    });
  }, []);

  return { history, addEntry, getLatestScore, getPersistedRegression };
}
