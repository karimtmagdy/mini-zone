export type CategoryResult = {
  score: number;
  maxScore: number;
  details: string[];
  status: 'pending' | 'partial' | 'complete';
};

export type PageRegressionInfo = {
  type: 'regression' | 'improvement' | 'stable';
  diff: number;
  previousScore: number;
};

export type PageCompletionResult = {
  path: string;
  totalScore: number;
  categories: {
    ui: CategoryResult;
    api: CategoryResult;
    validation: CategoryResult;
    loading: CategoryResult;
    error: CategoryResult;
    interaction: CategoryResult;
    accessibility: CategoryResult;
  };
  /** Persisted regression snapshot — stored with the entry, not derived at render time */
  regression?: PageRegressionInfo;
  timestamp: number;
};

export type PageHistoryEntry = {
  path: string;
  score: number;
  timestamp: number;
  /** Regression info captured at the moment this score was saved */
  regression?: PageRegressionInfo;
};

export const WEIGHTS = {
  ui: 20,
  api: 25,
  validation: 15,
  loading: 10,
  error: 10,
  interaction: 10,
  accessibility: 10,
} as const;

export type CategoryKey = keyof typeof WEIGHTS;
