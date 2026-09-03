import { useEffect, useState } from "react";
import {
  getDatasetProfile,
  getDatasetPreview,
} from "../services/datasets";
import type { DatasetResponse } from "../types/dataset";
import DataTable from "../components/dashboard/DataTable";

export default function Dataset() {
  const [dataset, setDataset] = useState<DatasetResponse | null>(null);
  const [preview, setPreview] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const datasetId = localStorage.getItem("dataset_id");

    if (!datasetId) {
      setError("No dataset found. Please upload a dataset first.");
      setLoading(false);
      return;
    }

    const loadDataset = async () => {
      try {
        const [profileResponse, previewResponse] = await Promise.all([
          getDatasetProfile(datasetId),
          getDatasetPreview(datasetId),
        ]);

        setDataset(profileResponse);
        setPreview(previewResponse.rows);
      } catch (err) {
        console.error(err);
        setError("Failed to load dataset.");
      } finally {
        setLoading(false);
      }
    };

    loadDataset();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading dataset...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!dataset) {
    return null;
  }

  const profile = dataset.profile;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {dataset.filename}
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Dataset overview and preview
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">Rows</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {profile.rows}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">Columns</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {profile.columns}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">Missing Values</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {profile.missing_values}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">Duplicate Rows</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {profile.duplicate_rows}
          </p>
        </div>
      </div>

      {/* Dataset Preview */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Dataset Preview
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Showing the first {preview.length} rows
          </p>
        </div>

        <DataTable rows={preview} />
      </div>

      {/* Column Information */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Column Information
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 text-left text-gray-300">
                  Column
                </th>

                <th className="px-4 py-3 text-left text-gray-300">
                  Data Type
                </th>

                <th className="px-4 py-3 text-left text-gray-300">
                  Missing
                </th>

                <th className="px-4 py-3 text-left text-gray-300">
                  Unique
                </th>
              </tr>
            </thead>

            <tbody>
              {profile.column_details.map((column) => (
                <tr
                  key={column.name}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-4 py-3 text-gray-300">
                    {column.name}
                  </td>

                  <td className="px-4 py-3 text-gray-400">
                    {column.data_type}
                  </td>

                  <td className="px-4 py-3 text-gray-400">
                    {column.missing}
                  </td>

                  <td className="px-4 py-3 text-gray-400">
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