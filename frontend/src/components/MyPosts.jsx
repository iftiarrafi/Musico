import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getmyposts } from "../redux/posts/MypostsSlice";
import {
  clearUpdateSliceState,
  updatepost,
} from "../redux/posts/UpdatePostSlice";
import { deletePost } from "../redux/posts/DeletePostSlice";

const MyPosts = () => {
  const dispatch = useDispatch();

  const {
    status: postsStatus,
    error: postsError,
    posts,
  } = useSelector((state) => state.myposts);

  const { status: updateStatus, error: updateError } = useSelector(
    (state) => state.updatepostStore
  );

  const { status: deleteStatus, error: deleteError } = useSelector(
    (state) => state.deletepostStore
  );

  const [popup, setPopup] = useState(false);
  const [deletepopup, setdeletePopup] = useState(false);
  const [postIdtoDelete, setPostIdtoDelete] = useState("");

  const [newText, setNewText] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    dispatch(getmyposts());
  }, [dispatch]);

  useEffect(() => {
    if (updateStatus === "succeeded") {
      setPopup(false);
      setNewText("");
      setNewPhoto(null);
      dispatch(clearUpdateSliceState());
      dispatch(getmyposts());
    }
  }, [updateStatus, dispatch]);

  const handleEdit = (id, text, photo) => {
    setPostId(id);
    setNewText(text);
    setNewPhoto(photo);
    setPopup(true);
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("text", newText);
    if (newPhoto) formdata.append("photo", newPhoto);

    try {
      dispatch(updatepost({ id: postId, formdata }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePopUp = (id) => {
    setPostIdtoDelete(id);
    setdeletePopup(true);
  };

  const handleDelete = () => {
    try {
      dispatch(deletePost({ postId: postIdtoDelete }));
      setdeletePopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {deletepopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {deleteStatus === "loading" ? (
            <div className="w-100 h-40 bg-black text-white">
              <h2>Loading...</h2>
            </div>
          ) : (
            <div className="w-100 h-80 bg-black text-white">
              <h4>Are you sure want to delete?</h4>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setdeletePopup(false)}>Cancel</button>
            </div>
          )}
          {deleteError && (
            <div className="w-100 h-80 bg-black text-white">
              <h2>Error : {deleteError}</h2>
              <button onClick={() => setdeletePopup(false)}>Close</button>
            </div>
          )}
        </div>
      )}
      {popup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <form encType="multipart/form-data" onSubmit={handleUpdatePost}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={(e) => setNewPhoto(e.target.files[0])}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {updateStatus === "loading" ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => setPopup(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
              {updateError && (
                <div className="text-red-500 mt-2">{updateError}</div>
              )}
            </form>
          </div>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {postsStatus === "loading" ? (
          <div className="text-center text-gray-500 animate-pulse">
            Loading...
          </div>
        ) : postsStatus === "failed" ? (
          <div className="text-red-500 text-center font-semibold">
            {postsError}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((t) => (
              <div
                key={t._id}
                className="bg-gray-100 shadow-md rounded-lg p-4 flex items-start space-x-4"
              >
                {t.photo && (
                  <img
                    src={t.photo}
                    alt="Post"
                    className="w-32 h-32 object-cover rounded-md border-2 border-gray-300"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t.text}
                  </h3>
                  <button
                    onClick={() => handleEdit(t._id, t.text, t.photo)}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePopUp(t._id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyPosts;
