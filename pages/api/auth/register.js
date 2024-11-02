// API de Registro
/*
import bcrypt from 'bcryptjs';
import dbConnect from '../..../utils/dbConnect';
import User from '../../../models/User';
//import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req, res) {
    await dbConnect();

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

*/

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Verifique se o usuário já existe
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      // Crie um novo usuário
      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}