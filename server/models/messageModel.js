import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    sender: {
        type: String
    },
    sender_avatar: {
        type: String
    },
    receiver: {
        type: String
    },
})

const messageModel = mongoose.model("messages", messageSchema)
export default messageModel