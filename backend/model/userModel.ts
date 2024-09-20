import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
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
    pic: String,
}, { collection: "signUpData" })

export const UserModel = mongoose.model("UserModel", userSchema);