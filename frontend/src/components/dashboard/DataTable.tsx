interface DataTableProps {
  rows: Record<string, unknown>[];
}

export default function DataTable({ rows }: DataTableProps) {
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-400">
        No data available.
      </div>
    );
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
      <table className="w-full min-w-max border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-3 text-left font-semibold text-gray-300"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-white/5 last:border-0 hover:bg-white/5"
            >
              {columns.map((column) => (
                <td
                  key={column}
                  className="px-4 py-3 text-gray-400"
                >
                  {row[column] === null || row[column] === undefined
                    ? "—"
                    : String(row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}