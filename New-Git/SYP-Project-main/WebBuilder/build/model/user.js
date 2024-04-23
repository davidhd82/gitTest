"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
    }
}, { collection: 'users' });
const userModel = (0, mongoose_1.model)('UserSchema', UserSchema);
exports.default = userModel;
