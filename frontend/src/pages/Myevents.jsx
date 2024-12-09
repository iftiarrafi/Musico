import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allmyevents } from "../redux/Events";
import { useNavigate } from "react-router-dom";
import { clearUpdateStates } from "../redux/UpdateEventSlice";

const Myevents = () => {
  const { status, events, error } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editEvent = (eventId) => {
    dispatch(clearUpdateStates());
    navigate(`/dashboard/update-event/${eventId}`);
  };

  useEffect(() => {
    dispatch(allmyevents());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-teal-600 mb-10">
          My Events
        </h1>
        {status === "loading" ? (
          <div className="text-center text-lg text-gray-400">
            Loading Events...
          </div>
        ) : status === "failed" ? (
          <div className="text-center text-lg text-red-600">{error}</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-slate-700 text-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                {event.avatar !== "img_url" ? (
                  <img
                    src={event.avatar}
                    alt={event.event_name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-2">
                    {event.event_name}
                  </h2>
                  <p className="mb-1">
                    <span className="font-semibold">Event by:</span>{" "}
                    {event.event_creator_name}
                  </p>
                  <p className="mb-1">
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
                  <p className="mb-1">
                    <span className="font-semibold">Place:</span> {event.place}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Tickets:</span>{" "}
                    {event.tickets}
                  </p>
                </div>
                <button
                  onClick={() => editEvent(event._id)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors duration-300"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myevents;
