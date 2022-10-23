import { PlusIcon } from "@heroicons/react/solid";
import React from "react";
import { useDispatch } from "react-redux";

const CreateBtn = ({ openForm, localUser, menu }) => {
  const dispatch = useDispatch();

  return (
    <button
      disabled={!localUser}
      onClick={() => dispatch(openForm())}
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
