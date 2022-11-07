import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendedPost = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/posts/${post._id}`)}
      className="mt-6 cursor-pointer bg-white p-4 hover:shadow-lg transition-all duration-300 space-y-3 rounded-lg flex-col"
    >
      <ul className="flex items-center space-x-4">
        <li>
          <img
            className="object-cover rounded-lg h-14"
            alt="post image"
            src={post.image || "dubai.webp"}
          />
        </li>
        <li>
          <h1 className="text-secondary text-xs xl:text-sm font-medium max-w-[150px] max-h-[60px] overflow-hidden">
            {post.title}
          </h1>
        </li>
      </ul>
      <div className="flex items-center justify-between">
        <div className="h-12 overflow-hidden">
          <p className="text-secondary text-xs font-light max-w-[20ch] xl:max-w-[25ch] ">
            {post.message}
          </p>
        </div>
        <button className="text-primary text-xs font-bold">READ</button>
      </div>
    </div>
  );
};

export default RecommendedPost;
