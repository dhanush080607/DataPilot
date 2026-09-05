interface ColumnSelectorProps {
  columns: string[];
  selectedColumn: string;
  onChange: (column: string) => void;
}

export default function ColumnSelector({
  columns,
  selectedColumn,
  onChange,
}: ColumnSelectorProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-white">
          Distribution Column
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Choose a numeric column to visualize.
        </p>
      </div>

      <select
        value={selectedColumn}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none focus:border-cyan-400"
      >
        {columns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>
    </div>
  );
}