import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "photo_url"
    },
    cloudinary_id: {
        type: String,
        default: "cloudinary_url"
    },

    owner_id: {

        type: mongoose.Schema.ObjectId,
        //ref: "bands",
        required: true

    },
    owner_name: {

        type: String,
        required: true

    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,

        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})



const postModel = mongoose.model("posts", postSchema)
export default postModel