const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email:
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
        validate:
        {
            validator: function (pass) {
                return pass.length >= 8
            },
            message: "Password Must be at Least 8 characters long",
        }
    }
}, { timestamps: true });

export const UserModel = new mongoose.model('User', UserSchema);