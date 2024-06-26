import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv';
import { router } from './routes/userRoutes.js';
import { connectDB } from './config/db.js';

const app = express();

dotenv.config();

connectDB();

// Middleware to parse incoming JSON requests and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Other middleware
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use('/api/v1/user', router);

const PORT = process.env.MY_PORT || 8080;

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to server</h1>");
});

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`.bgMagenta.white);
});
