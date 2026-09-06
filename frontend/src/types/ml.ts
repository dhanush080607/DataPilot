export interface ModelEvaluation {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  confusion_matrix: number[][];
  test_samples: number;
}

export interface MLPreparation {
  target_column: string;
  feature_columns: string[];
  feature_count: number;
  total_samples: number;
  training_samples: number;
  testing_samples: number;
  test_size: number;
}

export interface TrainModelResponse {
  dataset_id: string;
  model: string;
  target_column: string;
  model_file: string;
  preparation: MLPreparation;
  evaluation: ModelEvaluation;
}

export interface ModelComparisonResponse {
  dataset_id: string;
  target_column: string;
  preparation: MLPreparation;
  models: Record<string, ModelEvaluation>;
  best_model: string;
  best_f1_score: number;
}