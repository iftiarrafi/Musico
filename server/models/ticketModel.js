import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    event: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    place: {
        required: true,
        type: String
    },
    owner_id: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    owner_name: {
        required: true,
        type: String
    }
})

const ticketModel = mongoose.model("tickets", ticketSchema)
export default ticketModel