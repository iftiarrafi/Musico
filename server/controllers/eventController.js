import bandModel from "../models/bandModel.js";
import eventModel from "../models/eventModel.js";
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'
export const createEvent = async (req, res) => {
    try {

        const bandId = req.band._id;

        const { event_name, time, place, tickets, price } = req.body;

        if (!event_name || !time || !place) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let uploadedFile;
        if (req.file) {

            const { path } = req.file;

            uploadedFile = await cloudinary.uploader.upload(path);

            fs.unlinkSync(path);
        }

        const band = await bandModel.findById(bandId);
        const bandname = band.bandname

        const event = new eventModel({
            event_name,
            time,
            place,
            tickets,
            price,
            event_creator_id: bandId,
            event_creator_name: bandname,
            avatar: uploadedFile?.secure_url,
            cloudinary_id: uploadedFile?.public_id
        });

        await event.save();


        band.events.push(event._id);
        await band.save();

        res.status(200).json({ message: 'Event created', event });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(400).json({ message: 'Error creating event' });
    }
};



export const updateEvent = async (req, res) => {
    try {

        const { id } = req.params;
        const event = await eventModel.findById(id)
        const { event_name, time, place, tickets, price } = req.body

        if (!event) {
            return res.status(400).json({ message: "No such event is found" })
        }

        if (req.file) {
            if (event.cloudinary_id) {
                await cloudinary.uploader.destroy(event.cloudinary_id)
            }


            const { path } = req.file
            const uploadFile = await cloudinary.uploader.upload(path)
            fs.unlinkSync(path)
            event.avatar = uploadFile.secure_url
            event.cloudinary_id = uploadFile.public_id

        }
        event.event_name = event_name
        event.time = time
        event.place = place
        event.tickets = tickets
        event.price = price
        await event.save()

        res.status(200).json({ message: "successfully updated", event })

    } catch (error) {
        res.status(400).json({ message: "error updating event" })
    }
}


export const allEvents = async (req, res) => {
    try {

        const events = await eventModel.find().sort({ time: -1 });

        const eventLength = events.length;
        if (eventLength > 0) {
            res.status(200).json({ message: `${eventLength} events.`, events });
        } else {
            res.status(200).json({ message: "No events are found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error occurred while fetching events!" });
    }
};


export const myevents = async (req, res) => {
    try {

        const band = await bandModel.findById(req.band._id).populate("events")
        if (!band) {
            return res.status(400).json({ message: "no band found" })
        }
        const events = band.events
        res.status(200).json({ message: "here your events", events })


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "error fetching events" })
    }
}

export default updateEvent