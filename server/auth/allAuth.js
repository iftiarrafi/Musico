import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import bandModel from '../models/bandModel.js'
export const isAuthenticated = async (req, res, next) => {
    try {

        const { userToken } = req.cookies
        const { bandToken } = req.cookies
        if (userToken) {
            const decodedUser = jwt.verify(userToken, process.env.JWT_SECRET)
            req.user = await userModel.findById(decodedUser.id)
            next()
        } else if (bandToken) {
            const decodedBand = jwt.verify(bandToken, process.env.JWT_SECRET)
            req.band = await bandModel.findById(decodedBand.id)
            next()
        } else {
            return res.status(400).json({ message: "no token is found.." })
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}