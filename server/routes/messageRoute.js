import express from 'express'
import isUserAuthenticated from '../auth/userAuth.js';
import isBandAuthentic from '../auth/bandAuth.js';
import sendUserMessage, { getbandmessages, getUserMessage, sendBandMessage } from '../controllers/messageController.js';
const messageRouter = express.Router();
/*for user*/
messageRouter.post("/user/send-message/:id", isUserAuthenticated, sendUserMessage)
messageRouter.get("/user/get-messages", isUserAuthenticated, getUserMessage)

/*for band*/
messageRouter.post("/band/send-message/:id", isBandAuthentic, sendBandMessage)
messageRouter.get("/band/get-messages", isBandAuthentic, getbandmessages)


export default messageRouter