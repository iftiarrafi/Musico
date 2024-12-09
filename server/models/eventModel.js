import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "img_url"
    },
    cloudinary_id: {
        type: String,
        default: "cld_url"
    },
    event_creator_id: {

        type: mongoose.Schema.ObjectId,
        ref: "bands",

    },
    event_creator_name: {

        type: String

    },
    tickets: {
        type: Number,
        default: 100
    },
    price: {
        type: String,
        default: "Free for anyone"
    },
    interested: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "users",

        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})



const eventModel = mongoose.model("events", eventSchema)
export default eventModel