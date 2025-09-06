const LeadStatusChart = ({ data }) => {
    const maxValue = Math.max(...data.map(([, count]) => count), 0);
    const colors = { New: 'bg-blue-500', Contacted: 'bg-yellow-500', Qualified: 'bg-purple-500', Converted: 'bg-green-500', Lost: 'bg-red-500' };

    return (
        <div className="space-y-4">
            {data.map(([status, count]) => (
                <div key={status} className="flex items-center">
                    <span className="w-28 text-sm text-slate-600 font-medium">{status}</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-6 mr-4">
                        <div
                            className={`${colors[status] || 'bg-slate-500'} h-6 rounded-full text-white text-xs flex items-center justify-end pr-2`}
                            style={{ width: `${maxValue > 0 ? (count / maxValue) * 100 : 0}%` }}
                        >
                            {count}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeadStatusChart;