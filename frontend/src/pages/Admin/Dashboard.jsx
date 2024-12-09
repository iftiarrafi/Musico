import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/Admin/AdminLoginSlice";
import { useNavigate } from "react-router-dom";
import AllUsers from "./AllUsers";
import AllBands from "./AllBands";
import AllEvents from "./AllEvents";
import SearchUsers from "./SearchUsers";
import SearchBand from "./SearchBand";
import AllPosts from "./AllPosts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.adminLogin);

  const [selected, setSelected] = useState("allevents");

  const renderComponent = () => {
    switch (selected) {
      case "users":
        return <AllUsers />;
      case "allposts":
        return <AllPosts />;
      case "allevents":
        return <AllEvents />;
      case "searchusers":
        return <SearchUsers />;
      case "searchbands":
        return <SearchBand />;

      default:
        <p>Select an option from menu!</p>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-200">
      <div className="overflow-clip w-1/4 bg-slate-300">
        <ul className="space-y-4 p-4 text-md">
          <li
            className={`cursor-pointer p-2 ${
              selected === "allevents" ? "bg-teal-500" : ""
            } `}
            onClick={() => setSelected("allevents")}
          >
            All Events
          </li>
          <li
            className={`cursor-pointer p-2 ${
              selected === "allposts" ? "bg-teal-500" : ""
            } `}
            onClick={() => setSelected("allposts")}
          >
            All Posts
          </li>
          {/* <li
            className={`cursor-pointer p-2 ${
              selected === "users" ? "bg-teal-500" : ""
            } `}
            onClick={() => setSelected("users")}
          >
            Users
          </li>
          <li
            className={`cursor-pointer p-2 ${
              selected === "bands" ? "bg-teal-500" : ""
            } `}
            onClick={() => setSelected("bands")}
          >
            Bands
          </li> */}
          <li
            className={`cursor-pointer p-2 ${
              selected === "searchusers" ? "bg-teal-500" : ""
            } `}
            onClick={() => setSelected("searchusers")}
          >
            Search users
          </li>
          <li
            className={`cursor-pointer p-2 ${
              selected === "searchbands" ? "bg-teal-500" : ""
            } `}
            onClick={() => setSelected("searchbands")}
          >
            Search bands
          </li>
        </ul>
      </div>
      <div className="w-3/4 overflow-hidden">
        <div className="h-full overflow-y-auto p-6 bg-white shadow-lg rounded-lg">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
