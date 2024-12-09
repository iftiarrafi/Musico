import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/posts/CreatePostSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);

  const { status, error } = useSelector((state) => state.createPost);

  const createpost = (e) => {
    e.preventDefault();
    try {
      const postdata = new FormData();
      postdata.append("text", text);
      if (photo) {
        postdata.append("photo", photo);
      }
      dispatch(createPost(postdata));
      setText("");
      setPhoto(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={text}
          placeholder="What's on your mind?"
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none text-gray-700"
        />
      </div>
      {photo && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(photo)}
            alt="Preview"
            className="max-h-32 w-full object-contain rounded-lg"
          />
          <button onClick={() => setPhoto(null)}> X </button>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536M9 11l-3 3m0 0l-3 3m6-3H3M13 13h6m-3 4h-3m-4-8V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4m3 4h.01"
            ></path>
          </svg>
          <span className="text-gray-700">Photo</span>
        </label>
        <button
          type="submit"
          onClick={createpost}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {status === "loading" ? "Creating..." : "Post"}
        </button>
      </div>
      {error ? <div className="text-red-500 mt-2">{error}</div> : <></>}
    </div>
  );
};

export default CreatePost;
