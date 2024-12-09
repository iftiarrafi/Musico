import express from 'express'
import adminRegister, { adminLogin, deleteEvent, deletePost, getAllevents, logoutAdmin, searchBand, searchUser, showAllBands, showAllusers } from '../controllers/adminController.js';
import isAdminAuthenticated from '../auth/adminAuth.js';

const adminRouter = express.Router();


//authentication
adminRouter.post("/register", adminRegister)
adminRouter.post("/login", adminLogin)
adminRouter.post("/logout", isAdminAuthenticated, logoutAdmin)

//managing events
adminRouter.get("/all-events", isAdminAuthenticated, getAllevents)
adminRouter.put("/delete-event/:postId", isAdminAuthenticated, deleteEvent)

// managing users
adminRouter.get("/show-all-users", isAdminAuthenticated, showAllusers)
adminRouter.get("/search-user", isAdminAuthenticated, searchUser)

// managing bands
adminRouter.get("/show-all-bands", isAdminAuthenticated, showAllBands)
adminRouter.get("/search-band", isAdminAuthenticated, searchBand)


// managing posts
adminRouter.put("/delete-post/:postId", isAdminAuthenticated, deletePost)

export default adminRouter