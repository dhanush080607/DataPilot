import axios from "axios";

import type {
  TrainModelResponse,
  ModelComparisonResponse,
} from "../types/ml";

const API_URL = "http://127.0.0.1:8000/api/v1";

export const getAvailableModels = async (): Promise<string[]> => {
  const response = await axios.get<{ models: string[] }>(
    `${API_URL}/ml/models`
  );

  return response.data.models;
};

export const trainModel = async (
  datasetId: string,
  targetColumn: string,
  modelName: string = "logistic_regression"
): Promise<TrainModelResponse> => {
  const response = await axios.post<TrainModelResponse>(
    `${API_URL}/ml/${datasetId}/train`,
    null,
    {
      params: {
        target_column: targetColumn,
        model_name: modelName,
      },
    }
  );

  return response.data;
};

export const compareModels = async (
  datasetId: string,
  targetColumn: string
): Promise<ModelComparisonResponse> => {
  const response = await axios.post<ModelComparisonResponse>(
    `${API_URL}/ml/${datasetId}/compare`,
    null,
    {
      params: {
        target_column: targetColumn,
      },
    }
  );

  return response.data;
};

export const predict = async (
  datasetId: string,
  modelName: string,
  features: Record<string, unknown>
) => {
  const response = await axios.post(
    `${API_URL}/ml/${datasetId}/predict`,
    {
      model_name: modelName,
      features,
    }
  );

  return response.data;
};