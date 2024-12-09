import adminModel from '../models/adminModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import eventModel from '../models/eventModel.js';
import bandModel from '../models/bandModel.js';
import userModel from '../models/userModel.js';
import postModel from '../models/postModel.js';
import mongoose from 'mongoose';
// aithentication
const adminRegister = async (req, res) => {
    try {

        const { email, password } = req.body;
        const doesExist = await adminModel.findOne({ email })
        if (doesExist) {
            return res.status(400).json({ message: "This email is already in use!" })
        }

        const mustHave = "admin.musico"
        const isAdminEmailValid = email.includes(mustHave)
        if (!isAdminEmailValid) {
            return res.json({ message: "Email must have 'admin.musico' as substring " })
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new adminModel({ email, password: hashedPassword })
        await newAdmin.save()
        return res.status(201).json({ message: "New admin has been created", admin: newAdmin })


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email });


        if (!admin) {
            return res.status(404).json({ message: "Admin is not found" });
        }

        const doesPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!doesPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect" });
        }



        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const options = {
            expires: new Date(
                Date.now() + parseInt(process.env.JWT_EXPIRES, 10) * 24 * 3600 * 1000
            ),
            httpOnly: true,
        };


        res.cookie("adminToken", token, options);

        return res.status(200).json({ message: "Logged in successfully", token, admin });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const logoutAdmin = async (req, res) => {
    try {
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true,
        };

        res.cookie("adminToken", null, options);
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// managing events
export const getAllevents = async (req, res) => {
    try {
        const events = await eventModel.find().sort({ time: -1 });

        const eventLength = events.length;
        if (eventLength > 0) {
            res.status(200).json({ message: `${eventLength} events.`, events });
        } else {
            res.status(200).json({ message: "No events are found" });
        }


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const deleteEvent = async (req, res) => {
    try {

        const { postId } = req.params
        const eventToBeDeleted = await eventModel.findById(postId)
        if (!eventToBeDeleted) {
            return res.status(404).json({ message: "Event is not found!" });
        }
        const creator_id = eventToBeDeleted.event_creator_id

        await bandModel.findByIdAndUpdate(creator_id,
            {
                $pull: { events: postId }
            },
            {
                new: true
            }
        )


        await eventModel.findByIdAndDelete(postId)



        return res.status(200).json({ message: "Event is deleted successfully!" })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// show and search all users
export const showAllusers = async (req, res) => {
    try {
        const users = await userModel.find({}).select("-password").select("-received_message").select("-sent_message").select("-tickets")
        if (users.length < 1) {
            return res.status(200).json({ message: "No user is available" })
        }

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const searchUser = async (req, res) => {
    try {

        const { query } = req.query
        if (!query) {
            return res.json({ message: "You didn't input anything!", users: [] })
        }

        const users = await userModel.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]

        },
            { _id: 1, username: 1, email: 1, location: 1, avatar: 1 }
        )

        if (users.length < 1) {
            return res.json({ message: "No user is found!", users: [] })
        }

        return res.status(200).json({ users: users })


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
//search and show all bands 
export const searchBand = async (req, res) => {
    try {


        const { query } = req.query;
        const bands = await bandModel.find({
            $or: [
                { bandname: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        },
            { _id: 1, bandname: 1, email: 1, location: 1, avatar: 1 }
        )
        if (bands.length < 1) {
            return res.json([])
        }

        return res.status(200).json(bands)


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const showAllBands = async (req, res) => {
    try {
        const bands = await bandModel.find({}, '_id bandname email location avatar')
        if (bands.length < 1) {
            return res.status(200).json({ message: "No band is available" })
        }

        return res.status(200).json(bands)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const owner_id = post.owner_id;

        console.log(owner_id);


        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            await userModel.findByIdAndUpdate(
                owner_id,
                { $pull: { posts: postId } },
                { new: true, session }
            );


            await postModel.findByIdAndDelete(postId, { session });


            await session.commitTransaction();

            return res.status(200).json({ message: "Post has been deleted" });
        } catch (error) {
            console.error("Transaction error:", error.message);
            await session.abortTransaction();
            return res.status(500).json({
                message: "Error during post deletion transaction",
                error: error.message,
            });
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error("Internal server error:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};


export default adminRegister