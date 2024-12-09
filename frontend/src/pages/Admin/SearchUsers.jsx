import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Searchuser = () => {
  const [user, setuser] = useState("");
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  useEffect(() => {
    const searchUser = async () => {
      if (!user.trim()) {
        setusers([]);
        return;
      }
      try {
        setusers([]);

        const response = await axios.get(
          `http://localhost:3001/api/v1/admin/search-user/?query=${user}`
        );
        console.log(response.data.users);

        setusers(response.data.users || []);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      searchUser();
    } else {
      setusers([]);
    }
  }, [user]);
  //   const delayDebounceFn = setTimeout(() => {
  //     const searchusers = async () => {
  //       if (!user.trim()) {
  //         setusers([]);
  //         return;
  //       }

  //       try {
  //         setLoading(true);
  //         const response = await axios.get(
  //           `http://localhost:3001/api/v1/admin/search-user/?query=${user}`
  //         );
  //         setusers(response.data.users || []);
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     searchusers();
  //   }, 300);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [user]);

  return (
    <div className="w-full min-h-screen bg-slate-200">
      <div className="flex flex-col">
        <label className="m-auto p-4 text-2xl" htmlFor="search-input">
          Search for users
        </label>
        <input
          id="search-input"
          className="w-[80%] p-4 bg-slate-300 my-4 mx-auto rounded-full"
          type="text"
          placeholder="Search users"
          value={user}
          onChange={(e) => setuser(e.target.value)}
        />
      </div>
      <div>
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        <ul>
          {users?.map((b) => (
            <li
              key={b._id}
              className="flex space-x-4 text-white bg-teal-500 p-3 m-4 rounded-md"
            >
              <img
                src={b.avatar || "/default-avatar.png"}
                className="w-10 h-10 rounded-full border-2 border-slate-600"
                alt="User Avatar"
              />
              <div className="flex flex-col">
                <h2>
                  <span className="text-md text-black">Name</span>: {b.username}
                </h2>
                <p>
                  <span className="text-md text-black">Email</span>: {b.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {!loading && users.length === 0 && user.trim() && (
          <p className="text-center text-gray-600">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Searchuser;
