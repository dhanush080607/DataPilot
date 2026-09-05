import type {
  StatisticsData,
  CorrelationData,
  AnomalyData,
  VisualizationData,
} from "../../types/analytics";

import StatisticsPanel from "./StatisticsPanel";
import CorrelationHeatmap from "./CorrelationHeatmap";
import OutlierPanel from "./OutlierPanel";
import DistributionChart from "./DistributionChart";

interface AnalyticsDashboardProps {
  statistics: StatisticsData;
  correlation: CorrelationData;
  anomalies: AnomalyData;
  visualization: VisualizationData | null;
}

export default function AnalyticsDashboard({
  statistics,
  correlation,
  anomalies,
  visualization,
}: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      <StatisticsPanel data={statistics} />

      <CorrelationHeatmap data={correlation} />

      <OutlierPanel data={anomalies} />

      {visualization && (
        <DistributionChart data={visualization} />
      )}
    </div>
  );
}