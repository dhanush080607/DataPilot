import { useEffect, useState } from "react";

import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";

import {
  getStatistics,
  getCorrelation,
  getAnomalies,
  getVisualization,
} from "../services/analytics";

import type {
  StatisticsData,
  CorrelationData,
  AnomalyData,
  VisualizationData,
} from "../types/analytics";

export default function Analytics() {
  const [statistics, setStatistics] =
    useState<StatisticsData | null>(null);

  const [correlation, setCorrelation] =
    useState<CorrelationData | null>(null);

  const [anomalies, setAnomalies] =
    useState<AnomalyData | null>(null);

  const [visualization, setVisualization] =
    useState<VisualizationData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const datasetId = localStorage.getItem("dataset_id");

    if (!datasetId) {
      setError("No dataset found. Please upload a dataset first.");
      setLoading(false);
      return;
    }

    const loadAnalytics = async () => {
      try {
        const statisticsResponse = await getStatistics(datasetId);
        const correlationResponse = await getCorrelation(datasetId);
        const anomaliesResponse = await getAnomalies(datasetId);

        setStatistics(statisticsResponse.statistics);
        setCorrelation(correlationResponse.correlation);
        setAnomalies(anomaliesResponse.anomalies);

        const numericColumns =
          statisticsResponse.statistics.numeric_columns;

        if (numericColumns.length > 0) {
          const visualizationResponse =
            await getVisualization(
              datasetId,
              numericColumns[0],
              "auto"
            );

          setVisualization(
            visualizationResponse.visualization
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

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

  if (!statistics || !correlation || !anomalies) {
    return (
      <div className="p-6 text-gray-400">
        Analytics data is unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Explore statistics, correlations, outliers, and
          distributions in your dataset.
        </p>
      </div>

      <AnalyticsDashboard
        statistics={statistics}
        correlation={correlation}
        anomalies={anomalies}
        visualization={visualization}
      />
    </div>
  );
}