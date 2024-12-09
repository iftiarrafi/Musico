import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const SearchBand = () => {
  const [band, setBand] = useState("");
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const searchBands = async () => {
      try {
        setBands([]);

        const response = await axios.get(
          `http://localhost:3001/api/v1/admin/search-band/?query=${band}`
        );

        setBands(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (band) {
      searchBands();
    } else {
      setBands([]);
    }
  }, [band]);

  return (
    <div className="w-full min-h-screen bg-slate-200">
      <div className="flex flex-col">
        <label className="m-auto p-4 text-2xl" htmlFor="">
          Search for Bands
        </label>
        <input
          className="w-[80%] p-4 bg-slate-300 my-4 mx-auto rounded-full"
          type="text"
          placeholder="Search Bands"
          value={band}
          onChange={(e) => setBand(e.target.value)}
        />
      </div>
      <div>
        <ul>
          {bands?.map((b) => (
            <li
              key={b._id}
              className="flex space-x-4 text-white bg-teal-500 p-3 m-4 rounded-md"
            >
              <img
                src={b.avatar}
                className="cover rounded-full size-10 border-2 border-slate-600"
                alt="phot"
              />
              <div className="flex flex-col">
                <h2>
                  {" "}
                  <span className="text-md text-black">Name</span> :{" "}
                  {b.bandname}
                </h2>
                <p>
                  {" "}
                  <span className="text-md text-black">Email</span> : {b.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBand;
