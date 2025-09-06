import Lead from '../models/lead.model.js';


export const createLead = async (req, res) => {
    try {
        const { name, email, phone, status, source, assignedTo, qualification, interest } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Please provide name, email, and phone' });
        }

        const leadExists = await Lead.findOne({ email });
        if (leadExists) {
            return res.status(400).json({ message: 'Lead with this email already exists' });
        }

        const lead = await Lead.create({
            name,
            email,
            phone,
            status,
            source,
            assignedTo,
            qualification,
            interest
        });

        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const updateLead = async (req, res) => {
    try {
        const { name, email, phone, status, source, assignedTo, qualification, interest } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        lead.name = name || lead.name;
        lead.email = email || lead.email;
        lead.phone = phone || lead.phone;
        lead.status = status || lead.status;
        lead.source = source || lead.source;
        lead.assignedTo = assignedTo || lead.assignedTo;
        lead.qualification = qualification || lead.qualification;
        lead.interest = interest || lead.interest;


        const updatedLead = await lead.save();
        res.status(200).json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        await lead.deleteOne(); 
        res.status(200).json({ message: 'Lead removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
