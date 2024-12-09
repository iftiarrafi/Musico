import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'
const register = async (req, res) => {
    try {
        const { username, email, password, location } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All credentials must be provided." });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Account with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        let avatar;
        let cloudinary_id;
        if (req.file) {
            const path = req.file.path
            const uploadData = await cloudinary.uploader.upload(path)
            avatar = uploadData.secure_url
            cloudinary_id = uploadData.public_id
            fs.unlinkSync(path)
        }

        const user = new userModel({ username, email, password: hashedPassword, location, avatar: avatar, cloudinary_id: cloudinary_id });
        await user.save();
        res.status(200).json({ message: "User is created", user });

    } catch (error) {
        res.status(400).json({ message: error.message || "Registration failed.." });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All credentials must be provided." });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Account with this email does not exist." });
        }

        const doesPasswordMatch = await bcrypt.compare(password, user.password);
        if (!doesPasswordMatch) {
            return res.status(400).json({ message: "Password does not match." });
        }

        const jwtSecret = process.env.JWT_SECRET;
        const userToken = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' });

        const options = {
            expires: new Date(
                Date.now() + parseInt(process.env.JWT_EXPIRES, 10) * 24 * 3600 * 1000
            ),
            httpOnly: true
        };

        res.status(200).cookie("userToken", userToken, options).json({ userToken, user });

    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ message: "Login failed." });
    }
}

export const logout = async (req, res) => {
    try {


        res.cookie("userToken", null, { expires: new Date(Date.now()), httpOnly: true }).json({ message: "loggout successfully" })
    } catch (error) {
        res.status(400).json({ message: "Logout failed." });
    }
}

export const myDetails = async (req, res) => {
    try {

        const me = await userModel.findById(req.user.id).select("-password")
        if (!me) {
            return res.status(500).json({ message: "You are not found" })
        }
        return res.status(200).json(me);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching your data" })
    }
}

export const alluser = async (req, res) => {
    try {
        const users = await userModel.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "error showing all users" })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id).select("-password")
        if (!user) {
            res.status(404).json({ message: "Error finding user" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Error fetching details" })
    }
}

export default register