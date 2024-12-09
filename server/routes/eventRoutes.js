import express from 'express'
import isBandAuthentic from '../auth/bandAuth.js'
import updateEvent, { allEvents, createEvent, myevents } from '../controllers/eventController.js'
import { upload } from '../utils/multer.js'
const eventRouter = express.Router()

eventRouter.post("/create-event", isBandAuthentic, upload.single('avatar'), createEvent)
eventRouter.put("/update-event/:id", isBandAuthentic, upload.single('avatar'), updateEvent)
eventRouter.get("/all-events", allEvents)
eventRouter.get("/my-events", isBandAuthentic, myevents)

export default eventRouter