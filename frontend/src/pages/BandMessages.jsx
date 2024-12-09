import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBandMessage } from "../redux/GetBandMessages";

const BandMessages = () => {
  const dispatch = useDispatch();
  const { received_messages, sent_messages, status, error } = useSelector(
    (state) => state.getbandmessage
  );

  const [sentBtn, setSentBtn] = useState(true);
  const [receivedBtn, setReceivedBtn] = useState(false);

  const handleSent = () => {
    setSentBtn(!sentBtn);
    setReceivedBtn(false);
  };
  const handleReceive = () => {
    setReceivedBtn(!receivedBtn);
    setSentBtn(false);
  };

  useEffect(() => {
    dispatch(getBandMessage());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center py-10">
      <div className="mb-6 flex space-x-4">
        <button
          onClick={handleSent}
          className={`px-6 py-2 rounded-lg focus:outline-none ${
            sentBtn ? "bg-[#50B498] text-white" : "bg-gray-800 text-gray-300"
          } hover:bg-[#9CDBA6] hover:text-slate-900`}
        >
          Sent Messages
        </button>
        <button
          onClick={handleReceive}
          className={`px-6 py-2 rounded-lg focus:outline-none ${
            receivedBtn
              ? "bg-[#50B498] text-white"
              : "bg-gray-800 text-gray-300"
          } hover:bg-[#9CDBA6] hover:text-slate-900`}
        >
          Received Messages
        </button>
      </div>

      {/* Received messages section */}
      {receivedBtn && (
        <div className="w-full max-w-4xl bg-gray-800 shadow-md rounded-lg p-4">
          {status === "loading" ? (
            <h2 className="text-center text-gray-400">Loading...</h2>
          ) : status === "failed" ? (
            <h2 className="text-center text-red-400">Error: {error}</h2>
          ) : (
            <div className="space-y-4">
              {received_messages.map((e) => (
                <div
                  key={e._id}
                  className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={e.sender_avatar || "/path/to/dummy-avatar.png"}
                      alt={e.sender}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-100">{e.sender}</h2>
                    <p className="text-gray-300">{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sent messages section */}
      {sentBtn && (
        <div className="w-full max-w-4xl bg-gray-800 shadow-md rounded-lg p-4">
          {status === "loading" ? (
            <h2 className="text-center text-gray-400">Loading...</h2>
          ) : status === "failed" ? (
            <h2 className="text-center text-red-400">Error: {error}</h2>
          ) : (
            <div className="space-y-4">
              {sent_messages.map((e) => (
                <div
                  key={e._id}
                  className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg shadow-sm"
                >
                  <div>
                    <h2 className="font-semibold text-gray-100">
                      To : {e.receiver}
                    </h2>
                    <p className="text-gray-300">{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BandMessages;
