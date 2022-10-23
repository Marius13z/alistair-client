import { UserIcon } from "@heroicons/react/solid";
import React from "react";

const CommentSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, id) => (
      <div
        className="mx-2 md:mx-10 flex border items-center space-x-5 border-gray-200 py-2 rounded-md"
        key={id + 10}
      >
        <div className=" rounded-md bg-gray-300 ml-2">
          <UserIcon className=" w-20 h-20 text-gray-200 dark:text-gray-700" />
        </div>
        <div className="w-full">
          <div className="h-2.5 skeleton-line w-[25%] md:w-[10%] mb-4"></div>
          <div className="h-2 skeleton-line w-[50%] md:w-[30%] mb-4"></div>
        </div>
      </div>
    ));
};

export default CommentSkeleton;
