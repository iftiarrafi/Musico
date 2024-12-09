import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getallposts } from "../redux/posts/AllPosts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, posts } = useSelector((state) => state.allpostStore);

  useEffect(() => {
    dispatch(getallposts());
  }, [dispatch]);

  const handleLikes = async (postId) => {
    const res = await axios.post(
      `http://localhost:3001/api/v1/post/like-post/${postId}`
    );
    dispatch(getallposts());
    return res.data;
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
                <p
                  onClick={() => navigate(`/ok/user-profile/${post.owner_id}`)}
                  className="text-sm text-blue-600 font-medium mb-4 cursor-pointer hover:underline"
                >
                  By: {post.owner_name}
                </p>

                <div className="text-gray-500 text-sm mb-4">
                  Posted on:{" "}
                  <span className="font-medium">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLikes(post._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {post.likes.includes("owner_id") ? "Unlike" : "Like"}
                  </button>
                  <p className="text-gray-700 text-sm">
                    {post.likes.length}{" "}
                    {post.likes.length === 1 ? "like" : "likes"}
                  </p>
                </div>
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

export default Post;
