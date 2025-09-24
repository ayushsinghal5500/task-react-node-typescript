import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import studentRoutes from './routes/studentRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1><p>Go to /api/students to see students</p>');
});
// Routes
app.use('/api', studentRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI || '', {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

export default app;
