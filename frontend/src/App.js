import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import Bandprofile from './pages/Bandprofile'
import Bandlogin from './pages/Bandlogin'
import About from './pages/About'
import Createevent from './components/CreateEvent'
import Event from './pages/Event'
import Myevents from './pages/Myevents'
import Privateband from './pages/BandPrivate/Privateband'
import Userlogin from './pages/Userlogin'
import Privateuser from './pages/UserPrivate/Privateuser'
import Userprofile from './pages/Userprofile'
import TicketConfirm from './components/TicketConfirm'
import UpdateEvent from './pages/UpdateEvent'
import UpdateBand from './pages/UpdateBand'
import AllBands from './pages/AllBands'

import PublicBandProfile from './pages/PublicBandProfile'
import BandMessages from './pages/BandMessages'
import AllPrivate from './pages/AllPrivate/AllPrivate'
import NoPage from './pages/NoPage'
import AllUsers from './pages/AllUsers'
import PublicUserProfile from './pages/PublicUserProfile'
import UserMessages from './pages/UserMessages'
import UserRegister from './pages/UserRegister'
import BandRegister from './pages/BandRegister'
import Post from './pages/Post'

import PrivateAdmin from './pages/Admin/PrivateAdmin'
import Dashboard from './pages/Admin/Dashboard'
import AdminLogin from './pages/Admin/AdminLogin'
import Successfull from './pages/Successfull'

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/user-register' element={<UserRegister />} />
            <Route path='/band-register' element={<BandRegister />} />

            <Route path='/band-login' element={<Bandlogin />} />
            <Route path='/user-login' element={<Userlogin />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/*' element={<NoPage />} />

            {/* admin private routes */}
            <Route path='/admin' element={<PrivateAdmin />}>
              <Route path='dashboard' element={<Dashboard />} />
            </Route>

            {/* All private */}
            <Route path='/ok' element={<AllPrivate />}>
              <Route path='events' element={<Event />} />
              <Route path='posts' element={<Post />} />
              <Route path='all-bands' element={<AllBands />} />
              <Route path='all-users' element={<AllUsers />} />
              <Route path='band-profile/:bandId' element={<PublicBandProfile />} />
              <Route path='user-profile/:userId' element={<PublicUserProfile />} />
            </Route>

            {/* Private Band Routes */}
            <Route path='/dashboard' element={<Privateband />}>

              <Route path='profile-band' element={<Bandprofile />} />
              <Route path='edit-band-profile' element={<UpdateBand />} />
              <Route path='create-event' element={<Createevent />} />
              <Route path='my-events' element={<Myevents />} />
              <Route path='update-event/:eventId' element={<UpdateEvent />} />
              <Route path='messages' element={<BandMessages />} />
            </Route>

            {/* Private User Routes */}
            <Route path='/user/dashboard' element={<Privateuser />}>

              <Route path='buy-ticket/:eventId' element={<TicketConfirm />} />
              <Route path='success/:eventId' element={<Successfull />} />
              <Route path='messages' element={< UserMessages />} />
              <Route path='profile-user' element={<Userprofile />} />

            </Route>

          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App