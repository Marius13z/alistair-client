import { HeartIcon, PencilIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLikePostMutation } from "../../features/postsApiSlice";
import { useGetUserQuery } from "../../features/userApiSlice";
import PostForm from "../../Form/PostForm";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState(false);
  const { data: user } = useGetUserQuery();
  const [likePost] = useLikePostMutation();

  return (
    <div className="bg-white relative group cursor-pointer shadow-xl hover:shadow-sm hover:border-gray-300 transition-all duration-300 mx-10 md:mx-0 mb-10 border-gray-200 border p-5 rounded-lg">
      {editForm ? (
        <PostForm post={post} setEditForm={setEditForm} editMode />
      ) : (
        <div className="flex space-x-6">
          <img
            className="h-24 w-24 object-cover p-1 rounded-lg border border-gray-200"
            src={post.image || "profilepic.png"}
            alt="profile pic"
          />
          <ul
            onClick={() => navigate(`/posts/${post._id}`)}
            className="flex flex-col space-y-1"
          >
            <li>
              <h1 className="text-secondary  font-medium">{post.title}</h1>
            </li>
            <li>
              <p className="text-secondary text-sm font-light">
                {post.message}
              </p>
            </li>
          </ul>
        </div>
      )}

      <div className="flex w-full justify-between pt-4 items-center">
        <button
          onClick={() => navigate(`/user/${post?.username}`)}
          className="text-xs text-secondary"
        >
          created by @{post.username}
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">{post.likes.length}</span>
          <button
            disabled={!user}
            onClick={() => likePost({ username: user.username, id: post._id })}
          >
            {post.likes.find((like) => like === user?.username) ? (
              <HeartIconFilled className="h-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5" />
            )}
          </button>
        </div>
      </div>
      {post.username === user?.username && (
        <PencilIcon
          onClick={() => setEditForm(!editForm)}
          className="flex space-x-2 absolute top-2 right-3 h-0 group-hover:h-4 md:group-hover:h-5 text-gray-500 hover:text-primary transition-all duration-300"
        />
      )}
    </div>
  );
};

export default Post;
