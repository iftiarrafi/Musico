import bandModel from "../models/bandModel.js"
import notificationModel from "../models/notificationModel.js"

/*for bands*/
const getallnotifications = async (req, res) => {
    try {

        const me = await bandModel.findById(req.band._id)
        let notifications = await notificationModel.find({ '_id': { $in: me.notifications } })
        res.json({ notifications })
    } catch (error) {
        res.json({ message: "error fetching all notifications..." })
    }
}


export default getallnotifications