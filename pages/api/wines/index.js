// API para listar os vinhos adicionaos por usuário

import Wine from "../../../models/Wine";
import connectToDatabase from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    await connectToDatabase();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Unauthorized!'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const wines = await Wine.find({userId: decoded.userId});
        res.status(200).json(wines);
    } catch (error) {
        res.status(500).json({meessage: 'Failed to fetch wines!'});
    }
}