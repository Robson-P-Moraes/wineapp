// API para criar vinho

import Wine from "../../../models/Wine";
import connectToDatabase from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    await connectToDatabase();

    if (req.method === 'POST'){
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: 'Unauthorized'});

        try {
            const decoded = jwt.verify(token, process.env.local.JWT_SECRET);
            const {name, year, type, bestYearToConsume, imageUrl} = req.body;

            const newWine = new Wine({
                userId: decoded.userId,
                name,
                year,
                type,
                bestYearToConsume,
                imageUrl,
            });

            await newWine.save();
            res.status(201).json(newWine);
        } catch (error) {
            res.status(500).json({message: 'Failed to create wine'});
        }
    } else {
        res.status(405).json({message: 'Method not allowed'})
    }
}