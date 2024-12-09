import bandModel from "../models/bandModel.js"
import messageModel from "../models/messageModel.js"
import userModel from "../models/userModel.js"


/*for user (sending only to band)*/
const sendUserMessage = async (req, res) => {
    try {

        const { id } = req.params
        const senderId = req.user._id

        const user = await userModel.findById(senderId)
        const band = await bandModel.findById(id)
        const receiverUser = await userModel.findById(id)
        if (band) {
            const { text } = req.body
            if (!text) {
                res.status(400).json({ messsage: "Text is empty" })
            }


            const newMessage = new messageModel({
                text: text,
                sender: user.username,
                sender_avatar: user.avatar,
                receiver: band.bandname,
                senderId: senderId,
                receiverId: id
            })
            await newMessage.save()

            /*pushing message to band*/

            band.received_message.push(newMessage._id)
            await band.save()

            /*pushing message to mine*/

            user.sent_message.push(newMessage._id)
            await user.save()

            res.status(200).json({ message: "sent" })

        } else if (receiverUser) {
            const { text } = req.body
            if (!text) {
                res.status(400).json({ messsage: "Text is empty" })
            }


            const newMessage = new messageModel({
                text: text,
                sender: user.username,
                sender_avatar: user.avatar,
                receiver: receiverUser.username,
                senderId: senderId,
                receiverId: id
            })
            await newMessage.save()

            /*pushing message to receiver user*/

            receiverUser.received_message.push(newMessage._id)
            await receiverUser.save()

            /*pushing message to mine*/

            user.sent_message.push(newMessage._id)
            await user.save()

            res.status(200).json({ message: "sent" })

        } else {
            return res.status(404).json({ message: "The id does not match to anyone" })
        }




    } catch (error) {
        res.status(500).json({ messsage: "message cannot be sent" })
    }
}
export const getUserMessage = async (req, res) => {
    try {

        const user = await userModel.findById(req.user._id).populate("received_message", 'text sender receiver sender_avatar').populate("sent_message", 'text receiver')


        const received_messages = user.received_message
        const sent_messages = user.sent_message
        res.status(200).json({ received_messages, sent_messages })

    } catch (error) {
        res.status(400).json({ messsage: "error fetching messages" })
    }
}

/*for band sending both band or user*/

export const sendBandMessage = async (req, res) => {
    try {

        const band = await bandModel.findById(req.band._id)
        const { text } = req.body
        const { id } = req.params
        const user = await userModel.findById(id)
        const receiverBand = await bandModel.findById(id)
        if (user) {
            if (!text) {
                res.status(400).json({ messsage: "Text is empty" })
            }
            const newMessage = new messageModel({
                text: text,
                sender: band.bandname,
                sender_avatar: band.avatar,
                receiver: user.username,
                senderId: band._id,
                receiverId: user._id
            })
            await newMessage.save()

            band.sent_message.push(newMessage._id)
            await band.save()

            user.received_message.push(newMessage._id)
            await user.save()

            res.status(201).json({ message: "Sent" })

        } else if (receiverBand) {
            if (!text) {
                res.status(400).json({ messsage: "Text is empty" })
            }
            const newMessage = new messageModel({
                text: text,
                sender: band.bandname,
                sender_avatar: band.avatar,
                receiver: receiverBand.bandname,
                senderId: band._id,
                receiverId: receiverBand._id
            })
            await newMessage.save()

            band.sent_message.push(newMessage._id)
            await band.save()

            receiverBand.received_message.push(newMessage._id)
            await receiverBand.save()

            res.status(201).json({ message: "Sent" })

        } else {
            return res.status(404).json({ message: "The id does not match to anyone" })
        }

    } catch (error) {
        res.status(400).json({ messsage: "message cannot be sent" })
    }
}

export const getbandmessages = async (req, res) => {
    try {

        const band = await bandModel.findById(req.band._id).populate("received_message", 'text sender receiver sender_avatar').populate("sent_message", 'text receiver')
        //console.log(band);

        const received_messages = band.received_message
        const sent_messages = band.sent_message
        res.status(200).json({ received_messages, sent_messages })

    } catch (error) {
        res.status(400).json({ messsage: "error fetching messages" })
    }
}



export default sendUserMessage