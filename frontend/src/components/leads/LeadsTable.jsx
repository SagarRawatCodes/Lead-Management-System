const LeadsTable = ({ leads, onEdit, onDelete }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                        {['Name', 'Email & Phone', 'Source', 'Status', 'Last Updated', 'Actions'].map(h => <th key={h} className="p-4 font-semibold text-slate-600">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {leads.length > 0 ? leads.map(lead => (
                        <tr key={lead._id} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="p-4 text-slate-800 font-medium">{lead.name}</td>
                            <td className="p-4 text-slate-600">
                                <div>{lead.email}</div>
                                <div className="text-xs text-slate-500">{lead.phone}</div>
                            </td>
                            <td className="p-4 text-slate-600">{lead.source}</td>
                            <td className="p-4">
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${ {New: 'bg-blue-100 text-blue-800', Contacted: 'bg-yellow-100 text-yellow-800', Qualified: 'bg-purple-100 text-purple-800', Converted: 'bg-green-100 text-green-800', Lost: 'bg-red-100 text-red-800'}[lead.status] || 'bg-slate-100 text-slate-800' }`}>
                                    {lead.status}
                                </span>
                            </td>
                            <td className="p-4 text-slate-600">{new Date(lead.updatedAt).toLocaleDateString()}</td>
                            <td className="p-4">
                                <div className="flex items-center space-x-4">
                                    <button onClick={() => onEdit(lead)} className="text-slate-500 hover:text-teal-600">Edit</button>
                                    <button onClick={() => onDelete(lead._id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="6" className="text-center p-8 text-slate-500">No leads found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default LeadsTable;
