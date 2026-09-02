import axios from "axios";
import type { DatasetResponse } from "../types/dataset";

const API_URL = "http://127.0.0.1:8000/api/v1";

export const getDatasetProfile = async (
  datasetId: string
): Promise<DatasetResponse> => {
  const response = await axios.get<DatasetResponse>(
    `${API_URL}/datasets/${datasetId}/profile`
  );

  return response.data;
};