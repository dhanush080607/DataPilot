import type { StatisticsData } from "../../types/analytics";

interface StatisticsPanelProps {
  data: StatisticsData;
}

export default function StatisticsPanel({
  data,
}: StatisticsPanelProps) {
  if (!data.numeric_columns.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">
          Statistics
        </h2>

        <p className="mt-3 text-sm text-gray-400">
          No numeric columns found in this dataset.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <div className="border-b border-white/10 p-5">
        <h2 className="text-lg font-semibold text-white">
          Statistical Summary
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Statistical information for numeric columns
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-5 py-4 text-left font-semibold text-gray-300">
                Column
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-300">
                Mean
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-300">
                Median
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-300">
                Minimum
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-300">
                Maximum
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-300">
                Std. Dev.
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-300">
                Variance
              </th>
            </tr>
          </thead>

          <tbody>
            {data.numeric_columns.map((column) => {
              const stats = data.statistics[column];

              return (
                <tr
                  key={column}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5"
                >
                  <td className="px-5 py-4 font-medium text-white">
                    {column}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {stats.mean}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {stats.median}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {stats.minimum}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {stats.maximum}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {stats.standard_deviation}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {stats.variance}
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