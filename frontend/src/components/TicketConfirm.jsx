import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { buyticket } from "../redux/Ticketslice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
axios.defaults.withCredentials = true;

const stripePromise = loadStripe(
  "pk_test_51QPnyyFJXIeyS5oY5xYV91U0LqefyxulxBc5iT2AOhLZ5iI9FtXtRCXCDtvagSfSUeOt1FJETLX7tDPavT2qHSvj00SDu1IpB8"
);

const TicketConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { eventId } = useParams();
  const { events } = useSelector((state) => state.event);
  const event = events.find((e) => e._id === eventId);
  const { status, error } = useSelector((state) => state.ticket);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, price: event.price }),
        }
      );

      const session = await response.json();
      console.log(session);

      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        alert("Payment failed: " + error.message);
        setLoading(false);
        return;
      }

      // Once payment is successful
      dispatch(buyticket(eventId));
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during payment.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/ok/events");
  };

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      setMsg(false);
    }
    if (status === "succeeded") {
      setLoading(false);
      setMsg(false);
      alert("Ticket Confirmed!");

      navigate("/ok/events");
    }
    if (status === "failed") {
      setLoading(false);
      alert("Ticket Confirmation Failed");
      setMsg(true);
    }
  }, [status, navigate, dispatch]);

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-slate-200 py-10 px-4 text-white">
        {loading && <h2>Confirming ticket. Please Wait...</h2>}
        <div className="max-w-2xl mx-auto bg-slate-300 rounded-lg shadow-lg py-4 px-6 text-slate-700 w-[45%] overflow-hidden">
          <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
          <p className="mb-2">
            <span className="font-semibold">Event by:</span>{" "}
            {event.event_creator_name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Time:</span> {event.time}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Place:</span> {event.place}
          </p>
          <p>Price : {event.price}</p>
          <p className="mb-4">
            <span className="font-semibold">Tickets Available:</span>{" "}
            {event.tickets}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowConfirmPopup(true)}
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition-colors duration-300"
            >
              Confirm Ticket
            </button>
            <button
              onClick={handleCancel}
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
        {msg && <h2 className="text-red-500">{error}</h2>}
      </div>

      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Ticket</h2>
            <p>Are you sure you want to confirm this ticket?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition-colors duration-300"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Elements>
  );
};

export default TicketConfirm;
