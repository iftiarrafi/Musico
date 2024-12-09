import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import bandRouter from './routes/bandRoutes.js'
import postRouter from './routes/postRoutes.js'
import notificationRouter from './routes/notificationRoutes.js'
import eventRouter from './routes/eventRoutes.js'
import ticketRouter from './routes/ticketRoutes.js'
import messageRouter from './routes/messageRoute.js'

import adminRouter from './routes/adminRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'



dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "100mb" }))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

/*database connection*/


async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected...");
    } catch (error) {
        console.log(error);

        console.log("database connection failed")

    }
}
connectDb()

/*database ends*/

app.use("/api/v1/user", userRouter)
app.use("/api/v1/band", bandRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/notify", notificationRouter)
app.use("/api/v1/event", eventRouter)
app.use("/api/v1/ticket", ticketRouter)
app.use("/message", messageRouter)
app.use("/api/payment", paymentRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})


