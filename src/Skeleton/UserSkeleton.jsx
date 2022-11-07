import { PlusCircleIcon, UserIcon } from "@heroicons/react/solid";
import React from "react";

const UserSkeleton = ({ cards, big }) => {
  return Array(cards)
    .fill(0)
    .map((_, id) => (
      <div
        className={`bg-white p-2 rounded-md shadow-sm my-4 animate-pulse flex ${
          big
            ? "max-w-lg ml-12 space-x-5 items-start"
            : "space-x-2 items-center"
        }`}
        key={id}
      >
        <UserIcon
          className={` text-gray-200 dark:text-gray-700 ${
            big ? "w-40 h-32 bg-gray-300" : "w-10 h-10"
          }`}
        />
        {big ? (
          <div className="w-full space-y-2 mt-2">
            <div className="h-2 skeleton-line w-[30%]"></div>
            <div className="h-4 skeleton-line w-[20%]"></div>
            <div className="h-2 skeleton-line w-[70%]"></div>
            <div className="h-2 skeleton-line w-[60%]"></div>
          </div>
        ) : (
          <div className="h-2 skeleton-line w-[70%]"></div>
        )}
      </div>
    ));
};

export default UserSkeleton;
