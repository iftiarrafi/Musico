import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from "../redux/CreateEvent";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const [showError, setShowError] = useState(false);
  const { status, error } = useSelector((state) => state.createevent);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      setMsg(false);
    } else if (status === "succeeded") {
      setLoading(false);
      setMsg(true);
      alert("Event is created!");
    } else if (status === "failed") {
      setLoading(false);
      setMsg(false);
      setShowError(true);
    }
  }, [status, error]);

  const [eventName, setEventName] = useState("");
  const [time, setTime] = useState(new Date());
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [tickets, setTicket] = useState(0);
  const [avatar, setAvatar] = useState(null);

  async function handleEvent(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("event_name", eventName);
      formData.append("time", time);
      formData.append("place", place);
      formData.append("price", price);
      formData.append("tickets", tickets);
      if (avatar) formData.append("avatar", avatar);

      dispatch(createEvent(formData));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Event
        </h2>
        <form encType="multipart/form-data" onSubmit={handleEvent}>
          <div className="mb-4">
            <label htmlFor="eventName" className="block text-sm font-medium">
              Event Name
            </label>
            <input
              id="eventName"
              className="w-full mt-2 p-2 border rounded-md text-black"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium">
              Time/Date
            </label>
            <DatePicker
              id="time"
              selected={time}
              onChange={(date) => setTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full mt-2 p-2 border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="place" className="block text-sm font-medium">
              Place
            </label>
            <input
              id="place"
              className="w-full mt-2 p-2 border rounded-md text-black"
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">
              Add Price :
            </label>
            <input
              id="price"
              className="w-full mt-2 p-2 border rounded-md text-black"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ticket" className="block text-sm font-medium">
              Tickets
            </label>
            <input
              id="ticket"
              className="w-full mt-2 p-2 border rounded-md text-black"
              type="number"
              value={tickets}
              onChange={(e) => setTicket(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-sm font-medium">
              Add Photo
            </label>
            <input
              id="avatar"
              className="w-full mt-2 p-2 border rounded-md text-white"
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {loading ? (
              <span>Creating event...</span>
            ) : (
              <span>Create Event</span>
            )}
          </button>
        </form>
        {msg ? (
          <div className="mt-4 text-green-500 text-center">
            <h2>Event is created</h2>
          </div>
        ) : (
          <></>
        )}
        {showError && (
          <div className="mt-4 text-red-500 text-center">
            <h2>{error}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
