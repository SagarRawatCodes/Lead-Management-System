import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import DashboardPage from './components/pages/DashboardPage.jsx';
import LeadsPage from './components/pages/LeadsPage.jsx';
import SettingsPage from './components/pages/SettingsPage.jsx';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/leads';

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setLeads(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
        setError("Could not connect to the server. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const renderPage = () => {
    if (loading) {
        return <div className="flex justify-center items-center h-full"><p className="text-slate-500">Loading data...</p></div>;
    }
    if (error) {
        return <div className="flex justify-center items-center h-full"><p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p></div>;
    }

    switch (activePage) {
      case 'leads':
        return <LeadsPage leads={leads} setLeads={setLeads} apiURL={API_URL} />;
      case 'dashboard':
        return <DashboardPage leads={leads} />;
      case 'LogOut':
        return <SettingsPage />;
      default:
        return <DashboardPage leads={leads} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
