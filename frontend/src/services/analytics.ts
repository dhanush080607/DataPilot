import axios from "axios";

import type {
  StatisticsResponse,
  CorrelationResponse,
  AnomalyResponse,
  VisualizationResponse,
} from "../types/analytics";

const API_URL = "http://127.0.0.1:8000/api/v1";


export const getStatistics = async (
  datasetId: string
): Promise<StatisticsResponse> => {
  const response = await axios.get<StatisticsResponse>(
    `${API_URL}/datasets/${datasetId}/statistics`
  );

  return response.data;
};


export const getCorrelation = async (
  datasetId: string
): Promise<CorrelationResponse> => {
  const response = await axios.get<CorrelationResponse>(
    `${API_URL}/datasets/${datasetId}/correlation`
  );

  return response.data;
};


export const getAnomalies = async (
  datasetId: string
): Promise<AnomalyResponse> => {
  const response = await axios.get<AnomalyResponse>(
    `${API_URL}/datasets/${datasetId}/anomalies`
  );

  return response.data;
};


export const getVisualization = async (
  datasetId: string,
  column: string,
  chartType: string = "auto",
  limit: number = 20
): Promise<VisualizationResponse> => {
  const response = await axios.get<VisualizationResponse>(
    `${API_URL}/datasets/${datasetId}/visualization`,
    {
      params: {
        column,
        chart_type: chartType,
        limit,
      },
    }
  );

  return response.data;
};