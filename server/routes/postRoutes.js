import express from 'express'
import isUserAuthenticated from '../auth/userAuth.js'
import { upload } from '../utils/multer.js'
import createpost, { allPost, deletepost, likePost, myposts, singlePost, updatepost } from '../controllers/postController.js'
import { isAuthenticated } from '../auth/allAuth.js'
const postRouter = express.Router()

postRouter.post("/create-post", isUserAuthenticated, upload.single('photo'), createpost)
postRouter.delete("/delete-post/:postId", isUserAuthenticated, deletepost)
postRouter.post("/update-post/:postId", isUserAuthenticated, upload.single('photo'), updatepost)
postRouter.get("/my-posts", isUserAuthenticated, myposts)
postRouter.post("/like-post/:postId", isAuthenticated, likePost)




/*for public*/

postRouter.get("/single-post/:postId", singlePost)
postRouter.get("/all-posts", allPost)



export default postRouter