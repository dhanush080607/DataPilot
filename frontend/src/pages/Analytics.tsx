import { useEffect, useState } from "react";

import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import ColumnSelector from "../components/analytics/ColumnSelector";
import DatasetOverview from "../components/analytics/DatasetOverview";
import ChartTypeSelector from "../components/analytics/ChartTypeSelector";

import {
  getStatistics,
  getCorrelation,
  getAnomalies,
  getVisualization,
} from "../services/analytics";

import { getDatasetProfile } from "../services/datasets";

import type {
  StatisticsData,
  CorrelationData,
  AnomalyData,
  VisualizationData,
} from "../types/analytics";

import type { DatasetProfile } from "../types/dataset";

export default function Analytics() {
  const [profile, setProfile] =
    useState<DatasetProfile | null>(null);

  const [statistics, setStatistics] =
    useState<StatisticsData | null>(null);

  const [correlation, setCorrelation] =
    useState<CorrelationData | null>(null);

  const [anomalies, setAnomalies] =
    useState<AnomalyData | null>(null);

  const [visualization, setVisualization] =
    useState<VisualizationData | null>(null);

  const [selectedColumn, setSelectedColumn] =
    useState("");

  const [chartType, setChartType] =
    useState<"histogram" | "bar">("histogram");

  const [loading, setLoading] =
    useState(true);

  const [chartLoading, setChartLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const datasetId =
      localStorage.getItem("dataset_id");

    if (!datasetId) {
      setError(
        "No dataset found. Please upload a dataset first."
      );

      setLoading(false);
      return;
    }

    const loadAnalytics = async () => {
      try {
        const profileResponse =
          await getDatasetProfile(datasetId);

        setProfile(profileResponse.profile);

        const [
          statisticsResponse,
          correlationResponse,
          anomaliesResponse,
        ] = await Promise.all([
          getStatistics(datasetId),
          getCorrelation(datasetId),
          getAnomalies(datasetId),
        ]);

        setStatistics(
          statisticsResponse.statistics
        );

        setCorrelation(
          correlationResponse.correlation
        );

        setAnomalies(
          anomaliesResponse.anomalies
        );

        const numericColumns =
          statisticsResponse.statistics.numeric_columns;

        if (numericColumns.length > 0) {
          const firstColumn =
            numericColumns[0];

          setSelectedColumn(firstColumn);

          const visualizationResponse =
            await getVisualization(
              datasetId,
              firstColumn,
              "auto"
            );

          setVisualization(
            visualizationResponse.visualization
          );

          if (
            visualizationResponse.visualization.chart_type ===
            "histogram"
          ) {
            setChartType("histogram");
          } else {
            setChartType("bar");
          }
        }
      } catch (err) {
        console.error(err);
        setError(
          "Failed to load analytics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const handleColumnChange = async (
    column: string
  ) => {
    const datasetId =
      localStorage.getItem("dataset_id");

    if (!datasetId) {
      return;
    }

    setSelectedColumn(column);
    setChartLoading(true);

    try {
      const response =
        await getVisualization(
          datasetId,
          column,
          chartType
        );

      setVisualization(
        response.visualization
      );
    } catch (err) {
      console.error(err);
    } finally {
      setChartLoading(false);
    }
  };

  const handleChartTypeChange = async (
    type: "histogram" | "bar"
  ) => {
    const datasetId =
      localStorage.getItem("dataset_id");

    if (!datasetId || !selectedColumn) {
      return;
    }

    setChartType(type);
    setChartLoading(true);

    try {
      const response =
        await getVisualization(
          datasetId,
          selectedColumn,
          type
        );

      setVisualization(
        response.visualization
      );
    } catch (err) {
      console.error(err);
    } finally {
      setChartLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (
    !profile ||
    !statistics ||
    !correlation ||
    !anomalies
  ) {
    return (
      <div className="p-6 text-gray-400">
        Analytics data is unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Explore statistics, correlations, outliers,
          and distributions in your dataset.
        </p>
      </div>

      {/* Dataset Overview */}
      <DatasetOverview
        profile={profile}
      />

      {/* Column Selector */}
      <ColumnSelector
        columns={statistics.numeric_columns}
        selectedColumn={selectedColumn}
        onChange={handleColumnChange}
      />

      {/* Chart Type Selector */}
      <ChartTypeSelector
        chartType={chartType}
        onChange={handleChartTypeChange}
      />

      {/* Chart Loading */}
      {chartLoading && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-400">
          Updating chart...
        </div>
      )}

      {/* Analytics Dashboard */}
      <AnalyticsDashboard
        statistics={statistics}
        correlation={correlation}
        anomalies={anomalies}
        visualization={visualization}
      />
    </div>
  );
}