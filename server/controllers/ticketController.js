import eventModel from "../models/eventModel.js"
import ticketModel from "../models/ticketModel.js"
import userModel from "../models/userModel.js"

const buyTicket = async (req, res) => {
    try {


        const event_id = req.params.eventId

        const event = await eventModel.findById(event_id)

        const user = await userModel.findById(req.user._id)

        const ticket = new ticketModel({
            event: event.event_name,
            date: event.time,
            place: event.place,
            owner_id: req.user._id,
            owner_name: user.username

        })
        await ticket.save()
        let available_ticket = event.tickets
        if (available_ticket > 0) {
            available_ticket--;
            event.tickets = available_ticket
        }
        await event.save()


        user.tickets.push(ticket._id)
        await user.save()

        res.json({ message: "ticket has been purchased!", ticket })

    } catch (error) {
        res.json({ message: "error buying ticket" })
    }
}

export const myTickets = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).populate("tickets")
        const tickets = user.tickets
        res.status(200).json(tickets)
    } catch (error) {
        res.status(400).json({ message: "error fetching tickets" })
    }
}
export default buyTicket