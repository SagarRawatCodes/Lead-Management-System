import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/lead.routes.js';

// Load environment variables from .env file for local development
dotenv.config();

const app = express();

// --- Middleware ---
// IMPORTANT: This is the CORS configuration that fixes the connection issue.
const corsOptions = {
  // Use the Vercel URL of your frontend in production
  // and a fallback for local development.
  origin: process.env.FRONTEND_URL || "http://localhost:5173", 
};
app.use(cors(corsOptions));
app.use(express.json());


// --- Routes ---
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Lead Management API</h1><p>Status: Running</p>');
});

app.use('/api/leads', leadRoutes);


// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
} else {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('Successfully connected to MongoDB Atlas.'))
        .catch(err => console.error('Initial MongoDB connection error:', err));
}

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// --- Export the app for Vercel ---
export default app;
