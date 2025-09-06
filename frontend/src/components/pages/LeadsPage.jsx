import { useState, useMemo } from 'react';
import axios from 'axios';
import LeadsTable from '../leads/LeadsTable';
import LeadModal from '../leads/LeadModel';
import { PlusIcon } from '../common/Icons';

const LeadsPage = ({ leads, setLeads, apiURL }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentLead, setCurrentLead] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const handleSaveLead = async (leadData) => {
        try {
            if (isEditMode) {
                const response = await axios.put(`${apiURL}/${leadData._id}`, leadData);
                setLeads(leads.map(lead => (lead._id === leadData._id ? response.data : lead)));
            } else {
                const response = await axios.post(apiURL, leadData);
                setLeads([...leads, response.data]);
            }
            setIsModalOpen(false);
        } catch (err) { console.error('Save error:', err); }
    };

    const handleDeleteLead = async (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await axios.delete(`${apiURL}/${id}`);
                setLeads(leads.filter(lead => lead._id !== id));
            } catch (err) { console.error('Delete error:', err); }
        }
    };
    
    const filteredLeads = useMemo(() => {
        return leads
            .filter(lead => 
                (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 lead.email.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .filter(lead => 
                statusFilter === 'All' || lead.status === statusFilter
            );
    }, [leads, searchTerm, statusFilter]);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Manage Leads</h1>
                <button onClick={() => { setIsModalOpen(true); setIsEditMode(false); setCurrentLead(null); }} className="mt-4 md:mt-0 flex items-center bg-teal-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-teal-700 transition duration-200">
                    <PlusIcon /> Add Lead
                </button>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-lg mb-6 flex flex-col md:flex-row gap-4 items-center">
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className="w-full md:w-auto px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option>All</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Converted</option>
                    <option>Lost</option>
                </select>
            </div>
            <LeadsTable leads={filteredLeads} onEdit={(lead) => { setIsModalOpen(true); setIsEditMode(true); setCurrentLead(lead); }} onDelete={handleDeleteLead} />
            {isModalOpen && <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveLead} lead={currentLead} isEditMode={isEditMode} />}
        </div>
    );
};

export default LeadsPage;

