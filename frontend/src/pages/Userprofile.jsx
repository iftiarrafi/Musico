import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearTicketState, mytickets } from "../redux/Ticketslice";
import jsPDF from "jspdf";
import { getmydetails } from "../redux/MyDetailsUser";
import CreatePost from "../components/CreatePost";
import { clearmypostsSlice, getmyposts } from "../redux/posts/MypostsSlice";
import MyPosts from "../components/MyPosts";

const Userprofile = () => {
  const dispatch = useDispatch();
  const { status, ticket, error } = useSelector((state) => state.ticket);
  const { user } = useSelector((state) => state.mydetails);

  const [postBtn, setPostBtn] = useState(false);
  const [ticketBtn, setTicketBtn] = useState(false);
  const [followingBtn, setFollowingBtn] = useState(false);

  useEffect(() => {
    dispatch(getmydetails());
  }, [dispatch]);

  useEffect(() => {
    if (ticketBtn) {
      dispatch(mytickets());
    } else if (!ticketBtn) {
      dispatch(clearTicketState());
    }
  }, [ticketBtn, dispatch]);

  useEffect(() => {
    if (postBtn) {
      dispatch(getmyposts());
    } else if (!postBtn) {
      dispatch(clearmypostsSlice());
    }
  }, [postBtn, dispatch]);

  const downloadticket = (ticket) => {
    const doc = new jsPDF();
    doc.text(`Event Name :  ${ticket.event}`, 10, 10);
    doc.text(`Event Date :  ${ticket.date}`, 10, 20);
    doc.text(`Event Place :  ${ticket.place}`, 10, 30);
    doc.text(`Event Owner :  ${ticket.owner_name}`, 10, 40);
    doc.save(`${ticket.event}.pdf`);
  };

  const handlePostBtn = () => {
    setPostBtn(!postBtn);
    setTicketBtn(false);
    setFollowingBtn(false);
  };

  const handleTicketBtn = () => {
    setPostBtn(false);
    setTicketBtn(!ticketBtn);
    setFollowingBtn(false);
  };

  const handleFollowingBtn = () => {
    setPostBtn(false);
    setTicketBtn(false);
    setFollowingBtn(!followingBtn);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Section */}
      <div className="bg-white shadow-xl rounded-xl p-8 mb-8 flex items-center space-x-6">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h1 className="text-4xl font-semibold mb-2 text-gray-800">
            {user?.username}
          </h1>
          <p className="text-lg text-gray-600">Email: {user?.email}</p>
          <p className="text-lg text-gray-700 mt-2">
            Location: {user?.location}
          </p>
        </div>
      </div>

      {/* Create Post Section */}
      <CreatePost />

      {/* Button Navigation */}
      <div className="flex justify-center mb-8 space-x-8">
        <span
          className={`cursor-pointer text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out ${
            postBtn
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handlePostBtn}
        >
          My Posts
        </span>

        <span
          className={`cursor-pointer text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out ${
            followingBtn
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handleFollowingBtn}
        >
          Following
        </span>

        <span
          className={`cursor-pointer text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out ${
            ticketBtn
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handleTicketBtn}
        >
          My Tickets
        </span>
      </div>

      {/* Post Section */}
      {postBtn && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            All Your Posts
          </h2>
          <MyPosts />
        </div>
      )}

      {/* Following Section */}
      {followingBtn && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Bands You Follow
          </h2>
          {/* Render followed bands here */}
        </div>
      )}

      {/* Tickets Section */}
      {ticketBtn && (
        <div className="bg-white shadow-lg rounded-xl p-6">
          {status === "loading" ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : status === "failed" ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Your Tickets
              </h2>
              {ticket.map((t) => (
                <div
                  key={t._id}
                  className="bg-gray-50 shadow-md rounded-lg p-4 mb-6 transition duration-300 ease-in-out hover:shadow-xl"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t.event}
                  </h3>
                  <p className="text-gray-600">Date: {t.date}</p>
                  <p className="text-gray-600">Place: {t.place}</p>
                  <p className="text-gray-600">Owner: {t.owner_name}</p>
                  <button
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
                    onClick={() => downloadticket(t)}
                  >
                    Download Ticket
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Userprofile;
