

import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lead name is required.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'],
        default: 'New'
    },
    source: {
        type: String,
        trim: true,
        default: 'Manual Entry'
    },
    notes: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true 
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
