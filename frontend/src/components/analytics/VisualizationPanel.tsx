import type { VisualizationData } from "../../types/analytics";

import ColumnSelector from "./ColumnSelector";
import ChartTypeSelector from "./ChartTypeSelector";
import DistributionChart from "./DistributionChart";

interface VisualizationPanelProps {
  columns: string[];
  selectedColumn: string;
  chartType: "histogram" | "bar";
  visualization: VisualizationData | null;
  chartLoading: boolean;
  onColumnChange: (column: string) => void;
  onChartTypeChange: (
    chartType: "histogram" | "bar"
  ) => void;
}

export default function VisualizationPanel({
  columns,
  selectedColumn,
  chartType,
  visualization,
  chartLoading,
  onColumnChange,
  onChartTypeChange,
}: VisualizationPanelProps) {
  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Data Visualization
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Select a column and chart type to explore your data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ColumnSelector
          columns={columns}
          selectedColumn={selectedColumn}
          onChange={onColumnChange}
        />

        <ChartTypeSelector
          chartType={chartType}
          onChange={onChartTypeChange}
        />
      </div>

      {chartLoading && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-400">
          Updating chart...
        </div>
      )}

      {visualization && !chartLoading && (
        <DistributionChart data={visualization} />
      )}

      {!visualization && !chartLoading && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center text-sm text-gray-400">
          Select a column to generate a visualization.
        </div>
      )}
    </div>
  );
}