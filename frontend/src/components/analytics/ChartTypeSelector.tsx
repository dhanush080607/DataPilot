interface ChartTypeSelectorProps {
  chartType: "histogram" | "bar";
  onChange: (chartType: "histogram" | "bar") => void;
}

export default function ChartTypeSelector({
  chartType,
  onChange,
}: ChartTypeSelectorProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-white">
          Chart Type
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Choose how you want to visualize the data.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onChange("histogram")}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
            chartType === "histogram"
              ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
              : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          Histogram
        </button>

        <button
          type="button"
          onClick={() => onChange("bar")}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
            chartType === "bar"
              ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
              : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          Bar Chart
        </button>
      </div>
    </div>
  );
}