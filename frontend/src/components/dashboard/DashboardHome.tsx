import FileUploader from "../common/FileUploader";
import StatCard from "./StatCard";

function DashboardHome() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome to DataPilot
        </h1>

        <p className="mt-2 text-gray-400">
          Turn your data into insights, predictions and decisions.
        </p>
      </div>

      <FileUploader />

      <div className="mt-8 grid grid-cols-3 gap-6">
        <StatCard title="Datasets" value={0} />
        <StatCard title="Analyses" value={0} />
        <StatCard title="ML Models" value={0} />
      </div>
    </div>
  );
}

export default DashboardHome;