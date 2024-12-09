import express from 'express'
import isUserAuthenticated from '../auth/userAuth.js'

import buyTicket, { myTickets } from '../controllers/ticketController.js'

const ticketRouter = express.Router()



/*id = event_id*/
ticketRouter.post("/buy-ticket/:eventId", isUserAuthenticated, buyTicket)


ticketRouter.get("/my-tickets", isUserAuthenticated, myTickets)

export default ticketRouter

