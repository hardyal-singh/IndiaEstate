import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

const signup=(req, res)=>{
    const {username, email, password}=req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser= new User ({username, email, password:hashedPassword})

    try {
        newUser.save();
        res.status(200).json({message:'user created successfully'})
    } catch (error) {
        res.send(error.message);
    }
}


export {signup};