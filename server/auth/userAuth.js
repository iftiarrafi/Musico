
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
const isUserAuthenticated = async (req, res, next) => {
    try {
        const { userToken } = req.cookies;
        //console.log(userToken);

        if (!userToken) {
            return res.status(400).json({ message: "no token is found.." })
        }

        const decodeUser = jwt.verify(userToken, process.env.JWT_SECRET)

        req.user = await userModel.findById(decodeUser.id)

        next()

    } catch (error) {
        console.log(error);
    }
}

export default isUserAuthenticated