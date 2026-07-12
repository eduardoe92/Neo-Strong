export default function StatCard({
  title,
  value,
  icon: Icon,
  colorClass,
  rightIcon,
}) {
  return (
    <div className="relative flex items-center gap-4 p-6 border border-gray-800 bg-strong rounded-2xl">
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon size={30} />
      </div>
      <div>
        <p className="text-xs font-black text-gray-400 uppercase">{title}</p>
        <h2 className="text-2xl font-black text-white">{value}</h2>
      </div>

      {rightIcon && (
        <div className="absolute text-gray-400 top-4 right-4">{rightIcon}</div>
      )}
    </div>
  );
}
