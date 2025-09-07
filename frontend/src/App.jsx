import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './components/pages/DashboardPage';
import LeadsPage from './components/pages/LeadsPage';
import SettingsPage from './components/pages/SettingsPage';

// --- THE FIX IS HERE ---
// We are now using the live backend URL directly to bypass any environment variable issues.
const API_BASE_URL = 'https://lead-management-system-khaki.vercel.app//api';
// --------------------

const App = () => {
    const [activePage, setActivePage] = useState('dashboard');
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/leads`);
            setLeads(response.data);
        } catch (err) {
            console.error("Failed to fetch leads:", err);
            setError('Could not connect to the server. Please make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleSaveLead = async (leadData) => {
        try {
            if (leadData._id) {
                // Update existing lead
                await axios.put(`${API_BASE_URL}/leads/${leadData._id}`, leadData);
            } else {
                // Create new lead
                await axios.post(`${API_BASE_URL}/leads`, leadData);
            }
            fetchLeads(); // Refresh data after saving
        } catch (err) {
            console.error("Failed to save lead:", err);
            // You could add a more specific error message here for the user
        }
    };

    const handleDeleteLead = async (leadId) => {
        try {
            await axios.delete(`${API_BASE_URL}/leads/${leadId}`);
            fetchLeads(); // Refresh data after deleting
        } catch (err) {
            console.error("Failed to delete lead:", err);
        }
    };


    const renderPage = () => {
        if (loading) {
            return <div className="p-8 text-center">Loading data...</div>;
        }
        if (error) {
            return <div className="p-8"><div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">{error}</div></div>;
        }

        switch (activePage) {
            case 'dashboard':
                return <DashboardPage leads={leads} />;
            case 'leads':
                return <LeadsPage leads={leads} onSave={handleSaveLead} onDelete={handleDeleteLead} />;
            case 'LogOut':
                return <SettingsPage />;
            default:
                return <DashboardPage leads={leads} />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;

