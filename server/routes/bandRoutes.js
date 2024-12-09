import express from 'express'
import register, { allBands, login, logout, myband, updateBandProfile } from '../controllers/bandController.js'
import isBandAuthentic from '../auth/bandAuth.js'
import { upload } from '../utils/multer.js'
const bandRouter = express.Router()
bandRouter.post("/register", register)
bandRouter.post("/login", login)

/*private*/
bandRouter.post("/logout", isBandAuthentic, logout)
bandRouter.get("/get-band-details", isBandAuthentic, myband)
bandRouter.post("/update-band-profile", isBandAuthentic, upload.single('avatar'), updateBandProfile)

/*public*/
bandRouter.get("/all-bands", allBands)

export default bandRouter