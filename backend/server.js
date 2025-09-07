import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/lead.routes.js';

dotenv.config();

const app = express();

// Render provides a PORT environment variable. We must use it.
const PORT = process.env.PORT || 10000;

// This code reads the FRONTEND_URL from the environment variables you set in the Render dashboard.
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
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
            // This is the crucial part for Render:
            // Listen on host 0.0.0.0 and the provided PORT.
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

