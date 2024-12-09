import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allEvents } from "../redux/Events.jsx";
import { useNavigate } from "react-router-dom";
import { clearTicketState } from "../redux/Ticketslice";

const Event = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, status, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(allEvents());
  }, [dispatch]);

  const handleTicket = (eventId) => {
    dispatch(clearTicketState());
    navigate(`/user/dashboard/buy-ticket/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-teal-600 font-extrabold text-center mb-12">
          All Events
        </h1>
        {status === "loading" ? (
          <div className="text-center text-lg text-gray-600">
            Loading Events...
          </div>
        ) : status === "failed" ? (
          <div className="text-center text-lg text-red-600">{error}</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer"
              >
                {event.avatar !== "img_url" ? (
                  <img
                    src={event.avatar}
                    alt={event.event_name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3">{event.event_name}</h2>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Event by:</span>{" "}
                    {event.event_creator_name}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Time:</span>{" "}
                    {new Date(event.time).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Place:</span> {event.place}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Price:</span> {event.price}
                  </p>
                  <p className="mb-4 text-gray-700">
                    <span className="font-semibold">Tickets:</span>{" "}
                    {event.tickets}
                  </p>
                </div>
                {event.price === "Free for anyone" ? (
                  ""
                ) : (
                  <button
                    onClick={() => handleTicket(event._id)}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors duration-300"
                  >
                    Buy Tickets
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
