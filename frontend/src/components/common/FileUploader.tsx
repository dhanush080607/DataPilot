import { useState } from "react";
import axios from "axios";

function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/datasets/upload",
        formData
      );

      setMessage(response.data.message);
      localStorage.setItem(
        "dataset_id",
        response.data.dataset_id
    );
      setFile(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.detail || "Upload failed."
        );
      } else {
        setMessage("Something went wrong.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-10 text-center">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-400/10 text-3xl">
        ↑
      </div>

      <h2 className="text-xl font-semibold">
        Upload your dataset
      </h2>

      <p className="mx-auto mt-2 max-w-md text-gray-400">
        Upload a CSV or Excel file to start analyzing your data.
      </p>

      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(event) => {
          setFile(event.target.files?.[0] || null);
          setMessage("");
        }}
        className="mx-auto mt-6 block w-full max-w-md rounded-lg border border-white/10 bg-[#0a0a0a] p-3 text-sm text-gray-300"
      />

      {file && (
        <p className="mt-3 text-sm text-gray-400">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-6 rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-black hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Dataset"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-300">
          {message}
        </p>
      )}

    </div>
  );
}

export default FileUploader;