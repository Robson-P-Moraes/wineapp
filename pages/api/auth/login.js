// API de Login
/*
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

*/

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao realizar login' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
