import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js";

const isAdminAuthenticated = async (req, res, next) => {
    try {
        const { adminToken } = req.cookies;
        // console.log(adminToken);

        if (!adminToken) {
            return res.status(401).json({ message: "No token found. Unauthorized access." });
        }

        const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET);
        req.admin = await adminModel.findById(decodedAdmin.id);

        if (!req.admin) {
            return res.status(404).json({ message: "Admin not found. Invalid token." });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default isAdminAuthenticated;
