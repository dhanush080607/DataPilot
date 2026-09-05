import type { CorrelationData } from "../../types/analytics";

interface CorrelationHeatmapProps {
  data: CorrelationData;
}

export default function CorrelationHeatmap({
  data,
}: CorrelationHeatmapProps) {
  if (!data.columns.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">
          Correlation
        </h2>

        <p className="mt-3 text-sm text-gray-400">
          No numeric columns found for correlation analysis.
        </p>
      </div>
    );
  }

  const getValue = (row: string, column: string) => {
    return data.correlation_matrix[row]?.[column] ?? null;
  };

  const getCellClass = (value: number | null) => {
    if (value === null) {
      return "bg-white/5 text-gray-500";
    }

    const intensity = Math.abs(value);

    if (intensity >= 0.8) {
      return "bg-white/30 text-white";
    }

    if (intensity >= 0.6) {
      return "bg-white/20 text-white";
    }

    if (intensity >= 0.4) {
      return "bg-white/15 text-gray-200";
    }

    if (intensity >= 0.2) {
      return "bg-white/10 text-gray-300";
    }

    return "bg-white/5 text-gray-400";
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <div className="border-b border-white/10 p-5">
        <h2 className="text-lg font-semibold text-white">
          Correlation Matrix
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Correlation between numeric columns
        </p>
      </div>

      <div className="overflow-x-auto p-5">
        <table className="border-collapse text-sm">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-gray-400">
                Column
              </th>

              {data.columns.map((column) => (
                <th
                  key={column}
                  className="min-w-28 px-3 py-3 text-center font-semibold text-gray-300"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.columns.map((row) => (
              <tr key={row}>
                <td className="px-3 py-3 font-medium text-white">
                  {row}
                </td>

                {data.columns.map((column) => {
                  const value = getValue(row, column);

                  return (
                    <td
                      key={column}
                      className={`border border-white/5 px-3 py-3 text-center ${getCellClass(
                        value
                      )}`}
                    >
                      {value === null
                        ? "—"
                        : value.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}