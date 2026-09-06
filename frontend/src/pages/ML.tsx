import { useEffect, useState } from "react";

import {
  getAvailableModels,
  trainModel,
  compareModels,
} from "../services/ml";

import type {
  TrainModelResponse,
  ModelComparisonResponse,
} from "../types/ml";

export default function ML() {
  const [datasetId, setDatasetId] = useState("");
  const [targetColumn, setTargetColumn] = useState("Loan_Status");
  const [modelName, setModelName] = useState("logistic_regression");

  const [models, setModels] = useState<string[]>([]);
  const [trainingResult, setTrainingResult] =
    useState<TrainModelResponse | null>(null);
  const [comparisonResult, setComparisonResult] =
    useState<ModelComparisonResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedDatasetId = localStorage.getItem("dataset_id");

    if (storedDatasetId) {
      setDatasetId(storedDatasetId);
    }

    const loadModels = async () => {
      try {
        const available = await getAvailableModels();
        setModels(available);
      } catch {
        setError("Failed to load available models.");
      }
    };

    loadModels();
  }, []);

  const handleTrain = async () => {
    if (!datasetId) {
      setError("No dataset selected.");
      return;
    }

    if (!targetColumn) {
      setError("Please enter a target column.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setTrainingResult(null);

      const result = await trainModel(
        datasetId,
        targetColumn,
        modelName
      );

      setTrainingResult(result);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Model training failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    if (!datasetId) {
      setError("No dataset selected.");
      return;
    }

    if (!targetColumn) {
      setError("Please enter a target column.");
      return;
    }

    try {
      setComparing(true);
      setError("");
      setComparisonResult(null);

      const result = await compareModels(
        datasetId,
        targetColumn
      );

      setComparisonResult(result);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Model comparison failed."
      );
    } finally {
      setComparing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Machine Learning
        </h1>

        <p className="mt-2 text-gray-400">
          Train, evaluate, and compare machine learning models.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Configuration */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">
          Model Configuration
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Dataset ID
            </label>

            <input
              value={datasetId}
              onChange={(e) =>
                setDatasetId(e.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="Dataset ID"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Target Column
            </label>

            <input
              value={targetColumn}
              onChange={(e) =>
                setTargetColumn(e.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="Loan_Status"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Model
            </label>

            <select
              value={modelName}
              onChange={(e) =>
                setModelName(e.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleTrain}
            disabled={loading}
            className="rounded-lg bg-cyan-400 px-5 py-3 font-medium text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Training..." : "Train Model"}
          </button>

          <button
            type="button"
            onClick={handleCompare}
            disabled={comparing}
            className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {comparing
              ? "Comparing..."
              : "Compare Models"}
          </button>
        </div>
      </div>

      {/* Training Result */}
      {trainingResult && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">
            Training Result
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <Metric
              label="Accuracy"
              value={trainingResult.evaluation.accuracy}
            />

            <Metric
              label="Precision"
              value={trainingResult.evaluation.precision}
            />

            <Metric
              label="Recall"
              value={trainingResult.evaluation.recall}
            />

            <Metric
              label="F1 Score"
              value={trainingResult.evaluation.f1_score}
            />
          </div>

          <div className="mt-5 text-sm text-gray-400">
            Model saved as:
            <span className="ml-2 text-cyan-300">
              {trainingResult.model_file}
            </span>
          </div>
        </div>
      )}

      {/* Comparison Result */}
      {comparisonResult && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">
            Model Comparison
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="px-4 py-3">
                    Model
                  </th>
                  <th className="px-4 py-3">
                    Accuracy
                  </th>
                  <th className="px-4 py-3">
                    Precision
                  </th>
                  <th className="px-4 py-3">
                    Recall
                  </th>
                  <th className="px-4 py-3">
                    F1 Score
                  </th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(
                  comparisonResult.models
                ).map(([name, metrics]) => (
                  <tr
                    key={name}
                    className="border-b border-white/5"
                  >
                    <td className="px-4 py-3 text-white">
                      {name.replaceAll("_", " ")}
                    </td>

                    <td className="px-4 py-3 text-gray-300">
                      {metrics.accuracy}
                    </td>

                    <td className="px-4 py-3 text-gray-300">
                      {metrics.precision}
                    </td>

                    <td className="px-4 py-3 text-gray-300">
                      {metrics.recall}
                    </td>

                    <td className="px-4 py-3 text-gray-300">
                      {metrics.f1_score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
            <p className="text-sm text-gray-400">
              Best Model
            </p>

            <p className="mt-1 text-lg font-semibold text-cyan-300">
              {comparisonResult.best_model.replaceAll(
                "_",
                " "
              )}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              F1 Score:{" "}
              <span className="text-white">
                {comparisonResult.best_f1_score}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


interface MetricProps {
  label: string;
  value: number;
}

function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}