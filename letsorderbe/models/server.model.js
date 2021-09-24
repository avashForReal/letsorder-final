const mongoose = require("mongoose");
const validator = require("validator")

const serverSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: 8
    },
}, { timestamps: true });

module.exports = mongoose.model("Server", serverSchema);