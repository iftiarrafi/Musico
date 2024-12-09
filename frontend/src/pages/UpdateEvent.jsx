import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { updateEvent } from "../redux/UpdateEventSlice";

const UpdateEvent = () => {
  const { eventId } = useParams();
  //console.log(eventId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events } = useSelector((state) => state.event);
  const { status, error } = useSelector((state) => state.updateevent);

  const [eventName, setEventName] = useState("");
  const [time, setTime] = useState(new Date());
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [tickets, setTicket] = useState(0);
  const [avatar, setAvatar] = useState(null);

  const [loading, setLoading] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    const event = events.find((e) => e._id === eventId);
    //console.log(event);
    setEventName(event.event_name);
    setTime(new Date(event.time));
    setPlace(event.place);
    setPrice(event.price);
    setTicket(event.tickets);
    setAvatar(event.avatar);

    if (status === "loading") {
      setLoading(true);
      setShowError(false);
    }
    if (status === "succeeded") {
      setLoading(false);
      setShowError(false);
      navigate("/dashboard/my-events");
    }
    if (status === "failed") {
      setLoading(false);
      setShowError(true);
    }
  }, [events, eventId, status, navigate]);

  const handleEvent = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("event_name", eventName);
    formdata.append("time", time);
    formdata.append("place", place);
    formdata.append("price", price);
    formdata.append("tickets", tickets);

    if (avatar) formdata.append("avatar", avatar);
    try {
      dispatch(updateEvent({ formdata, eventId }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-100 text-slate-800 flex items-center justify-center p-4">
        <div>
          {loading ? (
            <>
              <h2>Updating... Please wait</h2>
            </>
          ) : (
            <></>
          )}
          {showError ? (
            <>
              <h2>Error : {error}</h2>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full max-w-xl p-6 bg-slate-600 rounded-lg shadow-lg text-black">
          <form encType="multipart/form-data" onSubmit={handleEvent}>
            <div className="mb-4">
              <label
                htmlFor="eventName"
                className="block text-sm font-medium text-teal-500"
              >
                Event Name
              </label>
              <input
                id="eventName"
                className="w-full mt-2 p-2 border rounded-md"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-teal-500"
              >
                Time/Date
              </label>
              <DatePicker
                id="time"
                selected={time}
                onChange={(date) => setTime(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full mt-2 p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="place"
                className="block text-sm font-medium text-teal-500"
              >
                Place
              </label>
              <input
                id="place"
                className="w-full mt-2 p-2 border rounded-md"
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-teal-500"
              >
                Edit Price
              </label>
              <input
                id="price"
                className="w-full mt-2 p-2 border rounded-md"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ticket"
                className="block text-sm font-medium text-teal-500"
              >
                Tickets
              </label>
              <input
                id="ticket"
                className="w-full mt-2 p-2 border rounded-md"
                type="number"
                value={tickets}
                onChange={(e) => setTicket(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-teal-500"
              >
                Add Photo
              </label>
              <input
                id="avatar"
                className="w-full mt-2 p-2 border rounded-md text-teal-50"
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {loading ? (
                <span>Updating event...</span>
              ) : (
                <span>Update Event</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateEvent;
