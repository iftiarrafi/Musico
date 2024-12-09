import { configureStore } from "@reduxjs/toolkit";

import EventSlice from "../redux/Events.jsx";
import createEventSlice from "../redux/CreateEvent.jsx";
import AuthSlice from "../redux/Auth.jsx";
import userSlice from "../redux/Userauth.jsx";
import userRegisterSlice from "../redux/UserReg.jsx";
import Ticketslice from "../redux/Ticketslice.jsx";
import UpdateEventSlice from "./UpdateEventSlice.jsx";
import bandProfileSlice from "./Bandprofile.jsx";
import updateBandSlice from "./Updateband.jsx";
import allBandsSlice from "./AllBands.jsx";
import userMessage from "./UserSendMessage.jsx";
import getBandMessageSlice from "./GetBandMessages.jsx";
import allUserSlice from "./AllUsers.jsx";
import getSingleUserSlice from "./GetUserDetails.jsx";
import bandSendMessageSlice from "./BandSendMessage.jsx";
import getUserMessageSlice from "./GetUserMessages.jsx";
import myDetailsSlice from "./MyDetailsUser.jsx";
import CreatePostSlice from "./posts/CreatePostSlice.jsx";
import MypostsSlice from "./posts/MypostsSlice.jsx";
import UpdatePostSlice from "./posts/UpdatePostSlice.jsx";
import DeletePostSlice from "./posts/DeletePostSlice.jsx";
import allpostSlice from "./posts/AllPosts.jsx";
import adminAuthSlice from "./Admin/AuthSlice.jsx";
import adminLoginSlice from "./Admin/AdminLoginSlice.jsx";

const store = configureStore({
  reducer: {
    event: EventSlice,
    createevent: createEventSlice,
    updateevent: UpdateEventSlice,

    auth: AuthSlice,
    bandprofileInfo: bandProfileSlice,
    updateband: updateBandSlice,
    allbands: allBandsSlice,

    user: userSlice,
    userregister: userRegisterSlice,
    mydetails: myDetailsSlice,
    ticket: Ticketslice,
    allusers: allUserSlice,
    singleUser: getSingleUserSlice,

    sendMessageByuser: userMessage,
    sendMessageByband: bandSendMessageSlice,
    getbandmessage: getBandMessageSlice,
    getusermessage: getUserMessageSlice,

    createPost: CreatePostSlice,
    myposts: MypostsSlice,
    updatepostStore: UpdatePostSlice,
    deletepostStore: DeletePostSlice,
    allpostStore: allpostSlice,

    //admin
    adminRegister: adminAuthSlice,
    adminLogin: adminLoginSlice,
  },
});

export default store;
