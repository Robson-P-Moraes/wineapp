// Conexão com MongoDB

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error('Define MONGODB_URI in .env.local');
}

let cached = global.mongoose;

if (!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

async function connectToDatabase(){
    if (cached.conn){
        return cached.conn;
    }
    if (!cached.promise){
        cached.promise = (await mongoose.connect(MONGODB_URI)).isObjectIdOrHexString((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;