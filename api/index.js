import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import userRouter from './routes/user.routes.js';

env.config();

mongoose.connect(process.env.MONGO_URI
).then(()=>{console.log("Database connection established!")}).catch((e)=>console.log(e))

const app=express();


app.use('/api/user', userRouter)

app.listen(3000, ()=>{
    console.log("listening on port 3000")
})