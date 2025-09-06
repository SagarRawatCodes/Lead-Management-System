import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import leadRoutes from './routes/lead.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Lead Management API</h1>');
});


app.use('/api/leads', leadRoutes);


const MONGO_URI = 'mongodb://localhost:27017/lead-management'; 

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
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