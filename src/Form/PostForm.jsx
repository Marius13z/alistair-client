import { PhotographIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import Input from "./Input";
import FileBase from "react-file-base64";
import { useState } from "react";
import { deletePost, editPost, createPost } from "../features/posts-slice";
import { useDispatch } from "react-redux";

const PostForm = ({ editMode, post, setEditPost }) => {
  // get user from local storage in order to store relevant information in form
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // create local state to manage form inputs
  const [formData, setFormData] = useState({
    category: post?.category || "",
    image: post?.image || "",
    id: user?.id || user?._id,
    username: user?.username,
    message: post?.message || "",
    title: post?.title || "",
    date: new Date().toISOString(),
  });
  const dispatch = useDispatch();
  const id = post?._id;

  // create or edit post function
  const handleSubmitPost = (e) => {
    // prevent refresh default browser action
    e.preventDefault();

    if (editMode) {
      // update post with new information
      dispatch(editPost({ id, formData }));

      // close edit post form
      setEditPost(false);
    } else if (!editMode) {
      // create a post based on form data
      dispatch(createPost(formData));
    }
  };

  // delete post function
  const handleDeletePost = async () => {
    dispatch(deletePost(id));

    setEditPost(false);
  };

  return (
    <form
      onSubmit={handleSubmitPost}
      className={`rounded-md bg-white mb-10 ${
        !editMode && "border border-gray-200"
      }`}
    >
      <ul className="py-2 md:py-6 px-2 md:px-12 space-y-5">
        <li className="flex justify-between items-center w-full">
          <button
            type="file"
            className="w-40 md:w-56 flex items-center justify-center "
          >
            <PhotographIcon className="h-20 md:h-10 pr-2" />
            <FileBase
              type="file"
              onDone={({ base64 }) =>
                setFormData({ ...formData, image: base64 })
              }
              multiple={false}
            />
          </button>
          {editMode && (
            <button
              onClick={handleDeletePost}
              type="button"
              className="bg-red-400 flex items-center space-x-2 text-white rounded-full py-1.5 transition-all duration-300 hover:bg-red-500 px-2 md:px-8 font-medium text-xs"
            >
              <TrashIcon className="h-4 md:h-4" />
              <span>DELETE</span>
            </button>
          )}
        </li>
        <Input
          handleChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          text={
            editMode ? post.title : "example: The unexpected of New York City"
          }
          label={"Title"}
        />
        <li className="flex flex-col space-y-2">
          <label className="ml-1 font-medium text-sm text-secondary">
            Category
          </label>
          <select
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value.toLowerCase(),
              })
            }
            required
            className="outline-none border text-xs border-gray-200 p-2 rounded-lg"
          >
            <option className="option-category">Sports</option>
            <option className="option-category">Gaming</option>
            <option className="option-category">Movies</option>
            <option className="option-category">Politics</option>
          </select>
        </li>
        <li>
          <Input
            label={"Message"}
            textarea
            handleChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            text={
              editMode
                ? post.message
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
          />
        </li>
        <li>
          <button type="submit" className="btn-primary">
            {editMode ? "EDIT POST" : "CREATE POST"}
          </button>
        </li>
      </ul>
    </form>
  );
};

export default PostForm;
