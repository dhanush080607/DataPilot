import type { DatasetProfile } from "../../types/dataset";

interface DatasetOverviewProps {
  profile: DatasetProfile;
}

export default function DatasetOverview({
  profile,
}: DatasetOverviewProps) {
  const overviewItems = [
    {
      label: "Total Rows",
      value: profile.rows,
    },
    {
      label: "Total Columns",
      value: profile.columns,
    },
    {
      label: "Numeric Columns",
      value: profile.numeric_columns.length,
    },
    {
      label: "Categorical Columns",
      value: profile.categorical_columns.length,
    },
    {
      label: "Missing Values",
      value: profile.missing_values,
    },
    {
      label: "Duplicate Rows",
      value: profile.duplicate_rows,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          Dataset Overview
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          A quick summary of your dataset.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overviewItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-sm text-gray-400">
              {item.label}
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}