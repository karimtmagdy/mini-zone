import type { CategoryResult, CategoryKey } from './types';
import { WEIGHTS } from './types';
import { queryClient } from '@/lib/query-client';

export const analyzePage = (): Record<CategoryKey, CategoryResult> => {
  return {
    ui: analyzeUI(),
    api: analyzeAPI(),
    validation: analyzeValidation(),
    loading: analyzeLoading(),
    error: analyzeError(),
    interaction: analyzeInteraction(),
    accessibility: analyzeAccessibility(),
  };
};

function analyzeUI(): CategoryResult {
  const details: string[] = [];
  let score = 0;
  
  const textContent = document.body.innerText.trim();
  const elements = document.querySelectorAll('*');
  
  if (textContent.length > 500) {
    score += 10;
    details.push('Substantial text content detected');
  } else if (textContent.length > 100) {
    score += 5;
    details.push('Minimal text content detected');
  }
  
  if (elements.length > 50) {
    score += 10;
    details.push('Complex DOM structure detected');
  } else if (elements.length > 20) {
    score += 5;
    details.push('Simple layout detected');
  }

  return {
    score,
    maxScore: WEIGHTS.ui,
    details,
    status: score === WEIGHTS.ui ? 'complete' : score > 0 ? 'partial' : 'pending'
  };
}

function analyzeAPI(): CategoryResult {
  const details: string[] = [];
  let score = 0;

  const queryState = queryClient.getQueryCache().getAll();
  const hasActiveQueries = queryState.length > 0;
  const hasSuccessfulQueries = queryState.some(q => q.state.status === 'success');
  
  const hasDataFetchAttribute = document.querySelectorAll('[data-fetching="true"]').length > 0;
  const listItems = document.querySelectorAll('li, tr, [class*="item"], [class*="card"]');

  if (hasActiveQueries || hasDataFetchAttribute) {
    score += 15;
    details.push(`Queries found in cache: ${queryState.length}`);
    if (hasSuccessfulQueries) details.push('Active data successfully fetched');
  }

  if (listItems.length > 2) {
    score += 10;
    details.push('Dynamic data grid/list detected');
  }

  return {
    score,
    maxScore: WEIGHTS.api,
    details,
    status: score >= 20 ? 'complete' : score > 0 ? 'partial' : 'pending'
  };
}

function analyzeValidation(): CategoryResult {
  const details: string[] = [];
  let score = 0;

  const forms = document.querySelectorAll('form');
  const hasErrorMessages = document.querySelectorAll('[class*="error"], [id*="error"], [role="alert"]').length > 0;
  const hasZodHints = document.body.innerHTML.includes('zod') || document.body.innerHTML.includes('yup');

  if (forms.length > 0) {
    score += 5;
    details.push('Form elements present');
  }

  if (hasErrorMessages) {
    score += 5;
    details.push('Error message containers detected');
  }

  if (hasZodHints) {
    score += 5;
    details.push('Validation schema hints found');
  }

  return {
    score,
    maxScore: WEIGHTS.validation,
    details,
    status: score >= 10 ? 'complete' : score > 0 ? 'partial' : 'pending'
  };
}

function analyzeLoading(): CategoryResult {
  const details: string[] = [];
  let score = 0;

  const skeletons = document.querySelectorAll('[class*="skeleton"], [class*="Skeleton"]');
  const spinners = document.querySelectorAll('svg[class*="spin"], [class*="spinner"], [class*="Spinner"]');

  if (skeletons.length > 0 || spinners.length > 0) {
    score = 10;
    details.push('Loading skeletons/spinners implemented');
  }

  return {
    score,
    maxScore: WEIGHTS.loading,
    details,
    status: score === 10 ? 'complete' : 'pending'
  };
}

function analyzeError(): CategoryResult {
  const details: string[] = [];
  let score = 0;

  const bodyText = document.body.innerText.toLowerCase();
  const errorWords = ['error', 'failed', 'wrong', 'unavailable', 'try again'];
  const hasErrorUI = errorWords.some(word => bodyText.includes(word)) && document.querySelectorAll('button').length > 0;

  if (hasErrorUI) {
    score = 10;
    details.push('Error fallback UI detected');
  }

  return {
    score,
    maxScore: WEIGHTS.error,
    details,
    status: score === 10 ? 'complete' : 'pending'
  };
}

function analyzeInteraction(): CategoryResult {
  const details: string[] = [];
  let score = 0;

  const buttons = document.querySelectorAll('button');
  const hasHandlers = Array.from(buttons).some(btn => btn.getAttribute('onclick') || btn.getAttribute('type') === 'submit');

  if (buttons.length > 0) {
    score += 5;
    details.push('Interactive elements found');
  }

  if (hasHandlers || document.querySelectorAll('button[type="submit"]').length > 0) {
    score += 5;
    details.push('Submission/Interaction handlers detected');
  }

  return {
    score,
    maxScore: WEIGHTS.interaction,
    details,
    status: score === 10 ? 'complete' : score > 0 ? 'partial' : 'pending'
  };
}

function analyzeAccessibility(): CategoryResult {
  const details: string[] = [];
  
  const imgs = document.querySelectorAll('img');
  const imgsAlt = document.querySelectorAll('img[alt]');
  const inputs = document.querySelectorAll('input');
  const labels = document.querySelectorAll('label');
  const aria = document.querySelectorAll('[aria-label], [aria-labelledby]');

  const imgScore = imgs.length === 0 ? 4 : (imgsAlt.length / imgs.length) * 4;
  const labelScore = inputs.length === 0 ? 3 : (labels.length >= inputs.length ? 3 : 1);
  const ariaScore = aria.length > 0 ? 3 : 0;

  const total = Math.round(imgScore + labelScore + ariaScore);

  if (imgScore >= 4) details.push('Images are properly described');
  if (labelScore >= 3) details.push('Forms are properly labeled');
  if (ariaScore > 0) details.push('Aria attributes detected');

  return {
    score: total,
    maxScore: WEIGHTS.accessibility,
    details,
    status: total >= 8 ? 'complete' : total > 0 ? 'partial' : 'pending'
  };
}
