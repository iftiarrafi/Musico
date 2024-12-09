import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../redux/GetUserDetails";
import {
  bandSendMessage,
  clearMessageStateBand,
} from "../redux/BandSendMessage";
import {
  clearMessageStateUser,
  usersendmessage,
} from "../redux/UserSendMessage";

const PublicUserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.singleUser);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const { band } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  const handleMessage = () => {
    setShowModal(true);
  };

  const handleSend = () => {
    if (band) {
      dispatch(bandSendMessage({ userId, text: message }));
      setShowModal(false);
      setMessage("");
      dispatch(clearMessageStateBand());
    } else if (!band) {
      dispatch(usersendmessage({ bandId: userId, text: message }));
      setShowModal(false);
      setMessage("");
      dispatch(clearMessageStateUser());
    } else {
      alert("Message cannot be empty.");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-200 text-gray-800 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-gray-400 shadow-lg rounded-lg p-6">
        {status === "loading" ? (
          <h2 className="text-center text-gray-400">Loading...</h2>
        ) : status === "failed" ? (
          <h2 className="text-center text-red-400">Error: {error}</h2>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={user.avatar || "/path/to/dummy-avatar.png"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-gray-800">Email: {user.email}</p>
            </div>
            <button
              onClick={handleMessage}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
            >
              Send Message
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl mb-4">Send a Message</h2>
            <textarea
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicUserProfile;
