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
    credits: Number,
    plan: String,
    cardDetails: {
        cardHolderName: String,
        cardNumber: String,
        expiryDate: String,
        cvv: String
    }
}, { collection: "signUpData" })

export const UserModel = mongoose.model("UserModel", userSchema);