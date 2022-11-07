import React from "react";

const Comments = ({ comments }) => {
  return (
    <div className="flex p-2 rounded-lg border border-gray-200  mx-10  items-center space-x-6">
      <img
        referrerPolicy="no-referrer"
        className="h-20 w-20 rounded-sm"
        src={comments.image || "../profilepic2.png"}
        alt="profile pic"
      />
      <ul className="flex flex-col space-y-1">
        <li>
          <h1 className="text-secondary text-sm font-medium">
            {comments.username}
          </h1>
        </li>
        <li>
          <p className="text-secondary text-xs font-light">
            {comments.message}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Comments;
