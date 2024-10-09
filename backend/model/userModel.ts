import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    pic: String,
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNo: Number,
    password: {
        type: String,
        require: true
    },
    credits: {
        type: Number,
        default: 10,
    },
    plan: {
        type: String,
        default: "Free",
    },
    planExpire: {
        type: String,
        default: "",
    },
    customerId: {
        type: String,
        default: "",
    },
}, { collection: "signUpData" })

export const UserModel = mongoose.model("UserModel", userSchema);