// API de Login

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req, res){
    await connectToDatabase();

    if (req.method === 'POST'){
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.status(200).json({token});
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}