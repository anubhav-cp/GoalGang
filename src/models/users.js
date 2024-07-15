import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
    },
    userId:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export const User = mongoose.model('user', userSchema)