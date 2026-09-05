export interface ColumnStatistics {
  mean: number;
  median: number;
  minimum: number;
  maximum: number;
  standard_deviation: number;
  variance: number;
}

export interface StatisticsData {
  numeric_columns: string[];
  statistics: Record<string, ColumnStatistics>;
}

export interface StatisticsResponse {
  dataset_id: string;
  statistics: StatisticsData;
}

export interface CorrelationData {
  columns: string[];
  correlation_matrix: Record<
    string,
    Record<string, number | null>
  >;
}

export interface CorrelationResponse {
  dataset_id: string;
  correlation: CorrelationData;
}

export interface AnomalyDetails {
  outlier_count: number;
  outlier_percentage: number;
  lower_bound: number | null;
  upper_bound: number | null;
}

export interface AnomalyData {
  numeric_columns: string[];
  anomalies: Record<string, AnomalyDetails>;
}

export interface AnomalyResponse {
  dataset_id: string;
  anomalies: AnomalyData;
}

export interface VisualizationPoint {
  range?: string;
  category?: string;
  count: number;
}

export interface VisualizationData {
  column: string;
  chart_type: "histogram" | "bar";
  data: VisualizationPoint[];
}

export interface VisualizationResponse {
  dataset_id: string;
  visualization: VisualizationData;
}