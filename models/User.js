// Modelo de usuário

import mongoose from "mongoose";
// import { type } from "os";

const UserSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password:{type: String, required: true},
});

export default mongoose.models.User || mongoose.model('User', UserSchema);