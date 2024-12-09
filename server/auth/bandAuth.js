import jwt from 'jsonwebtoken'
import bandModel from '../models/bandModel.js'

const isBandAuthentic = async (req, res, next) => {
    try {
        const bandToken = req.cookies.bandToken
        if (!bandToken) {
            return res.json({ message: "No token is found!" })
        }
        const decodeBand = jwt.verify(bandToken, process.env.JWT_SECRET)
        req.band = await bandModel.findById(decodeBand.id)
        //console.log(req.band);
        next();
    } catch (error) {
        res.json({ message: "error occured while checking" })
        console.log(error);
    }
}

export default isBandAuthentic