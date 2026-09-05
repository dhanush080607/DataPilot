import type { AnomalyData } from "../../types/analytics";

interface OutlierPanelProps {
  data: AnomalyData;
}

export default function OutlierPanel({
  data,
}: OutlierPanelProps) {
  if (!data.numeric_columns.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">
          Outlier Detection
        </h2>

        <p className="mt-3 text-sm text-gray-400">
          No numeric columns found for outlier detection.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <div className="border-b border-white/10 p-5">
        <h2 className="text-lg font-semibold text-white">
          Outlier Detection
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Outliers detected using the IQR method
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-5 py-4 text-left text-gray-300">
                Column
              </th>

              <th className="px-5 py-4 text-left text-gray-300">
                Outliers
              </th>

              <th className="px-5 py-4 text-left text-gray-300">
                Percentage
              </th>

              <th className="px-5 py-4 text-left text-gray-300">
                Lower Bound
              </th>

              <th className="px-5 py-4 text-left text-gray-300">
                Upper Bound
              </th>
            </tr>
          </thead>

          <tbody>
            {data.numeric_columns.map((column) => {
              const anomaly = data.anomalies[column];

              return (
                <tr
                  key={column}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5"
                >
                  <td className="px-5 py-4 font-medium text-white">
                    {column}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {anomaly.outlier_count}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {anomaly.outlier_percentage}%
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {anomaly.lower_bound ?? "—"}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {anomaly.upper_bound ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}   