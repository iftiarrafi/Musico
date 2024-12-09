import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allEvents } from "../../redux/Events";
import axios from "axios";
axios.defaults.withCredentials = true;

const AllEvents = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(allEvents());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <p className="text-center text-xl text-gray-500">Loading events...</p>
    );
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const handleDelete = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/admin/delete-event/${postId}`
      );
      console.log(response.data);
      dispatch(allEvents());
    } catch (error) {
      console.log("couldn't delete event");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          All Events
        </h1>
        <ul className="space-y-4">
          {events?.map((e) => (
            <li
              key={e._id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                {e.event_name}
              </h2>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Time:</span> {e.time}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Creator:</span>{" "}
                {e.event_creator_name}
              </p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                onClick={() => handleDelete(e._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllEvents;
