import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { openCreateForm } from "../Posts/postsSlice";

const CreateBtn = ({ user, menu, setOpenMenu }) => {
  const dispatch = useDispatch();

  const handleOpenForm = () => {
    if (menu) {
      setOpenMenu(false);
    }

    dispatch(openCreateForm());
  };

  return (
    <button
      disabled={!user}
      onClick={handleOpenForm}
      className={` text-secondary font-semibold
         ${
           menu
             ? "flex flex-row-reverse items-center text-sm uppercase"
             : ` hover:text-white transition-all duration-300 text-xs  hover:bg-primary
         disabled:bg-gray-300 disabled:text-white py-2 px-3 lg:px-5 rounded-full bg-accent`
         }`}
    >
      Create Post
      {menu && <PlusIcon className="h-5 pr-3" />}
    </button>
  );
};

export default CreateBtn;
