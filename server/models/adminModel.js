import mongoose from "mongoose"

const adminSchdema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const adminModel = mongoose.model("admin", adminSchdema)
export default adminModel