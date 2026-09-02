interface StatCardProps {
  title: string;
  value: number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
      <p className="text-sm text-gray-400">{title}</p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default StatCard;