import { PlusCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFollowUserMutation } from "../../features/userApiSlice";

const Suggestion = ({ followee, follower }) => {
  const navigate = useNavigate();
  const [followUser] = useFollowUserMutation();

  return (
    <li className="mt-5 items-center space-x-4 flex">
      <img
        className="h-12 w-12 rounded-lg"
        alt="user picture"
        src={followee?.image || "../../profilepic2.png"}
      />
      <div className="flex justify-between grow">
        <button onClick={() => navigate(`/user/${followee.username}`)}>
          {followee.username}
        </button>
        <button
          disabled={!follower}
          onClick={() =>
            followUser({
              followee: followee._id,
            })
          }
        >
          <PlusCircleIcon className="text-primary h-7 hover:rotate-90 transition-all duration-300" />
        </button>
      </div>
    </li>
  );
};

export default Suggestion;
