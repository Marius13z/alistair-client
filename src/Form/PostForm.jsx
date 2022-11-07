import { PhotographIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import Input from "./Input";
import FileBase from "react-file-base64";
import { useState } from "react";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} from "../features/postsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateForm } from "../Posts/postsSlice";
import { XIcon } from "@heroicons/react/solid";

const PostForm = ({ editMode, post, setEditForm }) => {
  const [formData, setFormData] = useState({
    category: post?.category || "",
    image: post?.image || "",
    message: post?.message || "",
    title: post?.title || "",
    date: new Date().toDateString(),
  });
  const id = post?._id;
  const [createPost] = useCreatePostMutation();
  const [editPost] = useEditPostMutation();
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();
  const { createFormOpen } = useSelector((state) => state.posts);

  // create or edit post function
  const handleSubmitPost = (e) => {
    // prevent refresh default browser action
    e.preventDefault();

    if (editMode) {
      // update post with new information
      editPost({ formData, id });

      // close edit post form
      setEditForm(false);
    } else if (!editMode) {
      // create a post based on form data
      createPost(formData);

      // close create post form
      dispatch(closeCreateForm());
    }
  };

  // delete post function
  const handleDeletePost = () => {
    deletePost(id);

    // close edit form
    setEditForm(false);
  };

  return (
    <form
      onSubmit={handleSubmitPost}
      className={`rounded-md bg-white mb-10 ${
        !editMode && "border border-gray-200"
      }`}
    >
      <ul className="py-6 px-12 space-y-5">
        <li className="flex  justify-between items-center w-full">
          <button
            type="file"
            className=" w-56 flex items-center justify-center "
          >
            <PhotographIcon className="h-10 pr-2" />
            <FileBase
              type="file"
              onDone={({ base64 }) =>
                setFormData({ ...formData, image: base64 })
              }
              multiple={false}
            />
          </button>
          <ul className="flex space-x-4">
            {editMode && (
              <button
                onClick={handleDeletePost}
                type="button"
                className="bg-red-400 flex items-center space-x-2 text-white rounded-full py-1.5 transition-all duration-300 hover:bg-red-500 px-8 font-medium text-xs"
              >
                <TrashIcon className="h-4" />
                <span>DELETE</span>
              </button>
            )}
            {createFormOpen && (
              <button>
                <XIcon
                  onClick={() => dispatch(closeCreateForm())}
                  className="h-4 hover:rotate-90 transition-all duration-300 hover:text-red-500"
                />
              </button>
            )}
          </ul>
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
