import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearMessageStateUser,
  usersendmessage,
} from "../redux/UserSendMessage";
import {
  bandSendMessage,
  clearMessageStateBand,
} from "../redux/BandSendMessage";

const PublicBandProfile = () => {
  const { bands } = useSelector((state) => state.allbands);
  const { status, error } = useSelector((state) => state.sendMessageByuser);
  const { bandId } = useParams();
  const band = bands.find((b) => b._id === bandId);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const handleSendClick = () => setShowModal(true);
  const handleCancelClick = () => setShowModal(false);
  const { user } = useSelector((state) => state.user);

  const sendMessage = () => {
    if (user) {
      dispatch(usersendmessage({ bandId, text: message }));
      setShowModal(false);
      setMessage("");
      dispatch(clearMessageStateUser());
    } else if (!user) {
      dispatch(bandSendMessage({ userId: bandId, text: message }));
      setShowModal(false);
      setMessage("");
      dispatch(clearMessageStateBand());
    } else {
      alert("Message cannot be empty.");
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      alert("Message sent!");
      setShowModal(false);
    } else if (status === "failed") {
      setShowError(true);
    }
  }, [status, dispatch]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-slate-700 py-10 px-4 text-white">
      <div className="bg-slate-600 rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex flex-col items-center mb-6">
          <img
            src={band.avatar || "/path/to/dummy-avatar.png"}
            alt={band.band_name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <h3 className="text-2xl font-bold mt-4">{band.band_name}</h3>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Email:</span> {band.email}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {band.location}
          </p>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSendClick}
      >
        Send Message
      </button>
      {showError && <p className="text-red-500 mt-2">Error: {error}</p>}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
            <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={sendMessage}
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

export default PublicBandProfile;
