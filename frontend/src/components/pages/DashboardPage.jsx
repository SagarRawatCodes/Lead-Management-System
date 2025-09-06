import { useMemo } from 'react';
import StatCard from '../dashboard/StatCard.jsx';
import LeadStatusChart from '../dashboard/LeadStatusChart.jsx';

const DashboardPage = ({ leads }) => {
    const stats = useMemo(() => {
        const total = leads.length;
        const newLeads = leads.filter(l => l.status === 'New').length;
        const converted = leads.filter(l => l.status === 'Converted').length;
        const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;
        return { total, newLeads, converted, conversionRate };
    }, [leads]);

    const leadsByStatus = useMemo(() => {
        const counts = leads.reduce((acc, lead) => {
            acc[lead.status] = (acc[lead.status] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts);
    }, [leads]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Leads" value={stats.total} />
                <StatCard title="New Leads" value={stats.newLeads} />
                <StatCard title="Converted Leads" value={stats.converted} />
                <StatCard title="Conversion Percentage" value={`${stats.conversionRate}%`} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-slate-700 mb-4">Leads by Status</h2>
                <div style={{ height: '300px' }}>
                    <LeadStatusChart data={leadsByStatus} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

