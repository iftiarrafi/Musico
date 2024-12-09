import mongoose from "mongoose";

const bandSchema = new mongoose.Schema({
    bandname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "image_url"
    },
    cloudinary_id: {
        type: String,
        default: "public_url"
    },
    notifications: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "notifications"

        }
    ],
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "posts"
        }
    ],
    events: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "events"
        }
    ],
    sent_message: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "messages"
        }
    ],
    received_message: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "messages"
        }
    ]
})



const bandModel = mongoose.model("bands", bandSchema)
export default bandModel