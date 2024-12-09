import express from 'express'
import register, { alluser, getUserProfile, login, logout, myDetails } from '../controllers/userController.js'
import isUserAuthenticated from '../auth/userAuth.js'
import { upload } from '../utils/multer.js'

const userRouter = express.Router()

userRouter.post("/register", upload.single('avatar'), register)
userRouter.post("/login", login)
userRouter.post("/logout", isUserAuthenticated, logout)
userRouter.get("/myDetails", isUserAuthenticated, myDetails)

/*public*/
userRouter.get("/all-users", alluser)
userRouter.get("/get-single/:id", getUserProfile)


export default userRouter