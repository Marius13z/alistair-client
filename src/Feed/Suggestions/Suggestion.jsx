import { PlusCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUser } from "../../features/user-slice";

const Suggestion = ({ user }) => {
  const followingUser = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = {
    followingUser: followingUser?.username,
    followedUserId: user._id,
  };

  return (
    <li className="mt-5 items-center space-x-4 flex">
      <img
        className="h-12 w-12 rounded-lg"
        alt="user picture"
        src={user?.image || "../../profilepic2.png"}
      />
      <div className="flex justify-between grow">
        <button onClick={() => navigate(`/user/${user.username}`)}>
          {user.username}
        </button>
        <button
          disabled={!followingUser}
          onClick={() => dispatch(followUser(userData))}
        >
          <PlusCircleIcon className="text-primary h-7 hover:rotate-90 transition-all duration-300" />
        </button>
      </div>
    </li>
  );
};

export default Suggestion;
