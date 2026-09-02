import { useEffect, useState } from "react";
import { getDatasetProfile } from "../services/datasets";
import type { DatasetResponse } from "../types/dataset";

function Dataset() {
  const [dataset, setDataset] = useState<DatasetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const datasetId = localStorage.getItem("dataset_id");

    if (!datasetId) {
      setError("No dataset selected.");
      setLoading(false);
      return;
    }

    const loadDataset = async () => {
      try {
        const data = await getDatasetProfile(datasetId);
        setDataset(data);
      } catch {
        setError("Failed to load dataset.");
      } finally {
        setLoading(false);
      }
    };

    loadDataset();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-gray-400">
        Loading dataset...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-red-400">
        {error}
      </div>
    );
  }

  if (!dataset) {
    return null;
  }

  const { profile } = dataset;

  return (
    <div className="p-10 text-white">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dataset Overview
        </h1>

        <p className="mt-2 text-gray-400">
          {dataset.filename}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-5">

        <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <p className="text-sm text-gray-400">
            Rows
          </p>
          <p className="mt-2 text-3xl font-bold">
            {profile.rows}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <p className="text-sm text-gray-400">
            Columns
          </p>
          <p className="mt-2 text-3xl font-bold">
            {profile.columns}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <p className="text-sm text-gray-400">
            Missing Values
          </p>
          <p className="mt-2 text-3xl font-bold">
            {profile.missing_values}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <p className="text-sm text-gray-400">
            Duplicates
          </p>
          <p className="mt-2 text-3xl font-bold">
            {profile.duplicate_rows}
          </p>
        </div>

      </div>

      {/* Column Information */}
      <div className="mt-8 rounded-xl border border-white/10 bg-[#111111] p-6">

        <h2 className="mb-5 text-xl font-semibold">
          Column Information
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-white/10 text-sm text-gray-400">
                <th className="p-3">Column</th>
                <th className="p-3">Data Type</th>
                <th className="p-3">Missing</th>
                <th className="p-3">Unique</th>
              </tr>
            </thead>

            <tbody>
              {profile.column_details.map((column) => (
                <tr
                  key={column.name}
                  className="border-b border-white/5"
                >
                  <td className="p-3 font-medium">
                    {column.name}
                  </td>

                  <td className="p-3 text-gray-400">
                    {column.data_type}
                  </td>

                  <td className="p-3">
                    {column.missing}
                  </td>

                  <td className="p-3">
                    {column.unique}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Dataset;