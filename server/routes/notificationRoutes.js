import express from 'express'
import getallnotifications from "../controllers/notifiController.js"
import isBandAuthentic from "../auth/bandAuth.js"
import isUserAuthenticated from '../auth/userAuth.js'

const notificationRouter = express.Router()

notificationRouter.get("/my-notifications", isBandAuthentic, getallnotifications)


export default notificationRouter