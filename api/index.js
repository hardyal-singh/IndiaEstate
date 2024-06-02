import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';

env.config();

mongoose.connect(process.env.MONGO_URI
).then(()=>{console.log("Database connection established!")}).catch((e)=>console.log(e))

const app=express();
app.use(express.json());


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.use((err, req,res, next)=>{
    const statusCode =err.statusCode || 500;
    const message =err.message || "Internal Server Error";

    return res.status(statusCode).json({
        statusCode,
        message,
    })
})

app.listen(3000, ()=>{
    console.log("listening on port 3000")
})