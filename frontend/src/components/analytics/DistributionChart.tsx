import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { VisualizationData } from "../../types/analytics";

interface DistributionChartProps {
  data: VisualizationData;
}

export default function DistributionChart({
  data,
}: DistributionChartProps) {
  if (!data.data.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">
          Distribution
        </h2>

        <p className="mt-3 text-sm text-gray-400">
          No visualization data available.
        </p>
      </div>
    );
  }

  const chartData = data.data.map((item) => ({
    label: item.range ?? item.category ?? "Unknown",
    count: item.count,
  }));

  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <div className="border-b border-white/10 p-5">
        <h2 className="text-lg font-semibold text-white">
          {data.chart_type === "histogram"
            ? "Distribution"
            : "Category Distribution"}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Visualization of {data.column}
        </p>
      </div>

      <div className="p-5">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="label"
                angle={-35}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 11 }}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                name="Count"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}