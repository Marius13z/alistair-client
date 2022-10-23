import React from "react";
import CommentSkeleton from "./CommentSkeleton";

const CardSkeleton = ({ cards, big, small }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className={`cursor-pointer border border-gray-200 animate-pulse grow-1 bg-white p-4 space-y-5 rounded-lg flex-col ${
          small ? "mt-5" : big ? "mx-2 my-10" : " mx-2 md:mx-0 mb-7"
        }`}
      >
        <div role="status" className="flex space-x-4">
          <div
            className={`flex justify-center items-center bg-gray-300 rounded dark:bg-gray-700 ${
              small ? "h-12 w-32" : "h-24 w-48"
            }`}
          >
            <svg
              className={` text-gray-200 ${small ? "h-5" : "h-12"}`}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full">
            {small ? (
              <>
                <div className=" skeleton-line h-2 w-[100%] mb-2.5"></div>
                <div className=" skeleton-line h-2 w-[80%] mb-2.5"></div>
              </>
            ) : (
              <>
                <div className=" skeleton-line h-2.5 w-[20%] mb-4"></div>
                <div className=" skeleton-line h-2 w-[70%] mb-2.5"></div>
                <div className=" skeleton-line h-2 w-[60%] mb-2.5"></div>
                <div className=" skeleton-line h-2 w-[80%] mb-2.5"></div>
                <div className=" skeleton-line h-2 w-[50%] mb-2.5"></div>
              </>
            )}
          </div>
          <span className="sr-only">Loading...</span>
        </div>
        {small && (
          <div className="">
            <div className=" skeleton-line h-2 w-[100%] mb-2.5"></div>
            <div className=" skeleton-line h-2 w-[80%] mb-2.5"></div>
          </div>
        )}
        {big && <CommentSkeleton cards={3} />}
      </div>
    ));
};

export default CardSkeleton;
