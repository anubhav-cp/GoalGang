import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
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
    habits: [{
        type: Schema.Types.ObjectId,
        ref: 'habit'
    }],
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema);
export default User;