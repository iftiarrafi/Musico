import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
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
        default: "default_url"
    },
    cloudinary_id: {
        type: String,
        default: "default_url"
    },
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "posts"
        }
    ],
    notifications: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "notifications"

        }
    ],
    tickets: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "tickets",
            //default : 

        }
    ],
    liked_posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "posts"

        }
    ],
    interested_events: [
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



const userModel = mongoose.model("users", userSchema)
export default userModel