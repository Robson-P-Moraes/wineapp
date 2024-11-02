// Modelo de Vinho

import mongoose from "mongoose";
// import { type } from "os";

const wineSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: String,
    year: Number,
    type: String,
    bestYearToConsume: Number,
    imageUrl: String,
});

export default mongoose.models.Wine || mongoose.model('Wine', wineSchema);