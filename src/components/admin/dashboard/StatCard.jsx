export default function StatCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="flex items-center gap-4 p-6 border border-gray-800 shadow-lg bg-strong rounded-2xl">
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon size={28} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase">{title}</h3>
        <p className="text-3xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}
