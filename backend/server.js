import express from "express";
import 'dotenv/config'
import {router} from './Route/auth-route.js';
import connectDB from "./Utils/db.js";
const app = express();
import cors from 'cors';

app.use(express.json());

app.use(cors());
connectDB().then(() => {
    app.use("/api/v1", router);
})



app.listen(process.env.PORT, () => {
    console.log(`Listening to port number ${process.env.PORT}...`);
})

