import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    psw: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true
    },
    roles:{
        type: Array,
        items:{
            type: Number
        }
    }
}, { collection: 'users' });

const userModel = model('UserSchema', UserSchema);

export default userModel;
