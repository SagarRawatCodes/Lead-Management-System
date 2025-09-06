import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/lead.routes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Lead Management API</h1>');
});

app.use('/api/leads', leadRoutes);

// Use the MONGO_URI from the .env file
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas.');
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Connection error', err.message);
        process.exit(1);
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
