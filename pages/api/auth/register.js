// API de Registro

import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'POST'){
        const {username, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashedPassword});

        try{
            await newUser.save();
            res.status(201).json({message: 'User Registered!'});
        } catch (error){
            res.status(500).json({message: 'User registration failed'});
        }
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}