const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({

    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    client_company: {
        type: String,
    },
    points: {
        type: Number,
        
    },
    tier: {
        type: String,
    },
    referred_code:{},
    referred_user_id:{}


}, {
    timestamps: true,
})


const User = mongoose.model("user", UserSchema);

module.exports = User;