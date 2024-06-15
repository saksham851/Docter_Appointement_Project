import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors'
const app=express();
import dotenv from 'dotenv'


// import { connectDB } from './config/db.js';

dotenv.config();

// connectDB();

const PORT=process.env.MY_PORT ||8080;

app.use(express.json())
app.use(cors());
app.use(morgan("dev"))

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Welcome to server</h1>")
})

app.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`.bgMagenta.white)
})

