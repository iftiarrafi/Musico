import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import fs from 'fs';
import cloudinary from "../utils/cloudinary.js";

const createpost = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let response;
        if (req.file) {
            const path = req.file.path;
            response = await cloudinary.uploader.upload(path);
            fs.unlinkSync(path);
        }

        const newPost = new postModel({
            text,
            owner_id: userId,
            owner_name: user.username,
            photo: response?.secure_url,
            cloudinary_id: response?.public_id
        });

        await newPost.save();
        //console.log(user);

        user.posts.push(newPost._id);
        await user.save();

        return res.status(201).json({ message: "Post created", newPost });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred while creating a post" });
    }
}

export const updatepost = async (req, res) => {
    try {

        const { postId } = req.params


        const post = await postModel.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        //console.log(req.body);

        const { text } = req.body

        let cloudinaryData;
        if (req.file) {
            if (post.cloudinary_id) {
                await cloudinary.uploader.destroy(post.cloudinary_id)
            }
            const { path } = req.file
            cloudinaryData = await cloudinary.uploader.upload(path)
            fs.unlinkSync(path)
            post.photo = cloudinaryData?.secure_url
            post.cloudinary_id = cloudinaryData?.public_id
        }
        post.text = text
        await post.save()
        return res.status(201).json({ message: "Post updated", post });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred while updating post" });
    }
}

export const deletepost = async (req, res) => {
    try {

        const { postId } = req.params
        const post = await postModel.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        user.posts = user.posts.filter(id => id.toString() !== postId)
        await user.save()

        await postModel.findByIdAndDelete(postId)

        return res.status(200).json({ message: "Post deleted successfully" });



    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred while deleting post" });
    }
}

export const myposts = async (req, res) => {
    try {

        const user = await userModel.findById(req.user.id).populate("posts")
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        let posts = []
        posts = user.posts
        return res.status(200).json(posts)


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not fetch your posts" });
    }
}

/*for public*/

export const singlePost = async (req, res) => {
    try {

        const { postId } = req.params
        const post = await postModel.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        return res.status(200).json(post)


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not fetch post" });
    }
}

export const allPost = async (req, res) => {
    try {
        const posts = await postModel.find();
        return res.status(200).json(posts)

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not fetch post" });
    }
}

export const likePost = async (req, res) => {
    try {

        const { postId } = req.params;

        const owner_id = req.user ? req.user.id : req.band.id
        if (!owner_id) {
            return res.json({ message: "No owner found!" })
        }

        const post = await postModel.findById(postId)

        if (post.likes.includes(owner_id.toString())) {
            post.likes = post.likes.filter((p) => p.toString() !== owner_id.toString());
        } else {
            post.likes.push(owner_id);
        }
        await post.save()
        const likes = post.likes.length
        //console.log(likes);

        return res.status(200).json(likes)


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}



export default createpost;
