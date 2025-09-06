import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/lead.routes.js';

dotenv.config();

const app = express();


const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Fallback for local dev
};
app.use(cors(corsOptions));
app.use(express.json());


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


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
