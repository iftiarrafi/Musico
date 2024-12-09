import bandModel from "../models/bandModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import cloudinary from "../utils/cloudinary.js";
const register = async (req, res) => {
    try {
        const { bandname, email, password, location } = req.body
        if (!email || !bandname || !password || !location) {
            return res.json({ message: "every field must be provided.." })
        }
        const band = await bandModel.findOne({ email })
        if (band) {
            return res.json({ message: "user already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newBand = new bandModel({ bandname, email, password: hashPassword, location })
        await newBand.save();
        res.json({ message: "new band is created!", newBand })

    } catch (error) {
        res.json({ message: "error occured" })
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.statsu(400).json({ message: "every field must be provided.." })

        }
        const band = await bandModel.findOne({ email })
        if (!band) {
            return res.status(400).json({ message: "This band does not exists.." })
        }
        const passwordMatch = await bcrypt.compare(password, band.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials.." })

        }



        const bandToken = jwt.sign({ id: band._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        const options = {
            expires: new Date(
                Date.now() + parseInt(process.env.JWT_EXPIRES, 10) * 24 * 3600 * 1000
            ),
            httpOnly: true
        }
        res.cookie("bandToken", bandToken, options).status(200).json({ bandToken, band })
    } catch (error) {
        res.statsu(500).json({ message: "error occured while logging in..", error })
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        const options = {
            expires: new Date(
                Date.now()
            ),
            httpOnly: true
        }
        res.cookie("bandToken", null, options).json({ message: "logged out" })

    } catch (error) {
        res.json({ message: "error occured while logging out.." })
        console.log(error);
    }
}

export const updateBandProfile = async (req, res) => {
    try {

        const band = await bandModel.findById(req.band._id).select("-password")

        const { bandname, location } = req.body

        if (req.file) {
            await cloudinary.uploader.destroy(band.cloudinary_id)

            const { path } = req.file

            const uploadedfile = await cloudinary.uploader.upload(path)
            band.avatar = uploadedfile.secure_url
            band.cloudinary_id = uploadedfile.public_id
            fs.unlinkSync(path)
        }

        band.bandname = bandname

        band.location = location

        await band.save()

        res.status(200).json(band)

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error updating Band profile", error })
    }
}

export const myband = async (req, res) => {
    try {
        const band = await bandModel.findById(req.band._id).select("-password");
        if (!band) {
            return res.status(400).json({ message: "No band found" })
        }
        res.status(200).json(band)
    } catch (error) {
        res.status(400).json({ message: "error occured getting data.." })
        console.log(error);
    }
}

export const allBands = async (req, res) => {
    try {

        const bands = await bandModel.find().select("-password")
        res.status(200).json(bands)

    } catch (error) {
        res.status(400).json({ message: "error fetching data", error })
    }
}


export default register