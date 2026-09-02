export interface ColumnDetail {
  name: string;
  data_type: string;
  missing: number;
  unique: number;
}

export interface DatasetProfile {
  rows: number;
  columns: number;
  numeric_columns: string[];
  categorical_columns: string[];
  missing_values: number;
  duplicate_rows: number;
  column_details: ColumnDetail[];
}

export interface DatasetResponse {
  dataset_id: string;
  filename: string;
  profile: DatasetProfile;
}