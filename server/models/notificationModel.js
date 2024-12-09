import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    owner: {

        type: String

    },
    sender: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})



const notificationModel = mongoose.model("notifications", notificationSchema)
export default notificationModel