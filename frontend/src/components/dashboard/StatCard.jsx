const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
    <h3 className="text-sm font-medium text-slate-500">{title}</h3>
    <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
  </div>
);

export default StatCard;
