import mongoose, { Schema } from "mongoose";
import User from "./users.js";


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
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        points: {
            type: Number,
            default: 0
        },
        badges: {
            type: String,
            enum: ['gold', 'silver', 'bronze', 'none'],
            Default: 'none'
        }
    }],
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const Habit = mongoose.model('habit', habitSchema)
export default Habit