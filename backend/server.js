import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/lead.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 10000;

// --- THE DEFINITIVE FIX IS HERE ---
// We are hardcoding your exact frontend URL to solve the CORS issue.
const corsOptions = {
    origin: 'https://lead-management-client-cheo.onrender.com',
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
// ---------------------------------

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Lead Management API</h1><p>Status: Running</p>');
});

app.use('/api/leads', leadRoutes);

const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('Successfully connected to MongoDB Atlas.');
            app.listen(PORT, '0.0.0.0', () => {
                console.log(`Server is running on port: ${PORT}`);
            });
        })
        .catch(err => {
            console.error('Connection error', err.message);
            process.exit(1);
        });
} else {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1);
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


