import { useState, useEffect } from 'react';


const LeadModal = ({ isOpen, onClose, onSave, lead, isEditMode }) => {
    
    useEffect(() => {
        if (isOpen) {
            setFormData(lead || { name: '', email: '', phone: '', status: 'New', source: '', notes: '' });
        }
    }, [isOpen, lead]);

    const [formData, setFormData] = useState(lead || { name: '', email: '', phone: '', status: 'New', source: '', notes: '' });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = e => { e.preventDefault(); onSave(formData); };

    if (!isOpen) return null;
    
    
    const inputStyle = "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-fade-in-up">
              
                <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">{isEditMode ? 'Edit Lead' : 'Add New Lead'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                      
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                   
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                       
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputStyle} />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputStyle} />
                        </div>
                       
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="status">Lead Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange} className={`${inputStyle} bg-white`}>
                                <option>New</option>
                                <option>Contacted</option>
                                <option>Qualified</option>
                                <option>Converted</option>
                                <option>Lost</option>
                            </select>
                        </div>
                       
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="source">Lead Source</label>
                            <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} className={inputStyle} placeholder="e.g., Website, Referral"/>
                        </div>
                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="notes">Notes</label>
                            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows="3" className={inputStyle}></textarea>
                        </div>
                    </div>
                   
                    <div className="p-6 bg-slate-50 rounded-b-xl flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">Save Lead</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadModal;

