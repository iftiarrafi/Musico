import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../redux/AllUsers";

const AllUsers = () => {
  const { users, status, error } = useSelector((state) => state.allusers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchItems, setSearchItems] = useState("");

  const filtered = searchItems
    ? users.filter((user) =>
        user.username.toLowerCase().includes(searchItems.toLowerCase())
      )
    : users;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, status]);

  return (
    <div className="bg-slate-200 text-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center py-5">
          <h1 className="text-3xl font-bold mb-8 text-slate-700">All users</h1>
          <input
            type="text"
            placeholder="Search users"
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
            className="w-full max-w-md h-10 px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {status === "loading" ? (
          <h2 className="text-lg text-center">Loading...</h2>
        ) : status === "succeeded" ? (
          <div className="space-y-4 cursor-pointer">
            {filtered.map((b, index) => (
              <div
                key={index}
                className="flex items-center bg-slate-300 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                onClick={() => navigate(`/ok/user-profile/${b._id}`)}
              >
                <div className="w-1/3 flex-shrink-0">
                  <img
                    src={b.avatar}
                    alt={`${b.username} avatar`}
                    className="rounded-full w-24 h-24 object-cover border-4 border-teal-800"
                  />
                </div>
                <div className="w-2/3 ml-4">
                  <h2 className="text-xl text-gray-800">
                    username : {b.username}
                  </h2>
                  <p className="text-sm text-gray-800">email : {b.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-lg text-red-500 text-center">Error: {error}</h2>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
