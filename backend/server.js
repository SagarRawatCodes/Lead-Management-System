import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/lead.routes.js';

dotenv.config();

const app = express();

// --- THE FIX IS HERE ---
// We are now hardcoding the exact frontend URL to bypass environment variables.
const corsOptions = {
    origin: 'https://lead-management-system-knbn.vercel.app',
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
// ------------------------------

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Lead Management API</h1><p>Status: Running</p>');
});

app.use('/api/leads', leadRoutes);

const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('Successfully connected to MongoDB Atlas.'))
        .catch(err => console.error('Connection error', err.message));
} else {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;

