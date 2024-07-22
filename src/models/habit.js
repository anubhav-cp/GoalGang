import mongoose, { Schema } from "mongoose";
import { User } from "./users.js";

const habitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    visibility: {
        type: String,
        enum: ['Private', 'Public'],
        default: 'Private'
    },
    members : [{
        type: Schema.Types.ObjectId,
        ref: User
    }],
    host: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export const Habit = mongoose.model('habit', habitSchema)