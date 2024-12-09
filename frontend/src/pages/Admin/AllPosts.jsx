import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getallposts } from "../../redux/posts/AllPosts";
axios.defaults.withCredentials = true;

const AllPosts = () => {
  const dispatch = useDispatch();
  const { status, error, posts } = useSelector((state) => state.allpostStore);

  useEffect(() => {
    dispatch(getallposts());
  }, [dispatch]);

  const handleDelete = async (postId) => {
    try {
      console.log(postId);

      const res = await axios.put(
        `http://localhost:3001/api/v1/admin/delete-post/${postId}`
      );
      dispatch(getallposts());
      return res.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-12">
          Posts Feed
        </h1>

        {status === "loading" && (
          <div className="flex justify-center">
            <p className="text-2xl text-blue-500 animate-pulse">
              Loading posts...
            </p>
          </div>
        )}

        {status === "failed" && (
          <div className="flex justify-center">
            <p className="text-2xl text-red-500">Error: {error}</p>
          </div>
        )}

        {status === "succeeded" && posts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {post.text}
                </h2>
                <p className="text-sm text-blue-600 font-medium mb-4 cursor-pointer hover:underline">
                  By: {post.owner_name}
                </p>

                <div className="text-gray-500 text-sm mb-4">
                  Posted on:{" "}
                  <span className="font-medium">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-700 text-sm">
                    {post.likes.length}{" "}
                    {post.likes.length === 1 ? "like" : "likes"}
                  </p>
                </div>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {status === "succeeded" && posts.length === 0 && (
          <div className="flex justify-center">
            <p className="text-xl text-gray-600">No posts available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
