import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyticket } from "../redux/Ticketslice";

const Successfull = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleThis = () => {
    dispatch(buyticket(eventId));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your ticket has been confirmed.
        </p>
        <button
          onClick={handleThis}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-300"
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
};

export default Successfull;
