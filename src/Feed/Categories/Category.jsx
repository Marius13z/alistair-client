import React from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ image, category }) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/posts/category/${category}`)}
      className="flex cursor-pointer hover:shadow-lg transition-all duration-300 border mt-10 items-center space-x-5 min-w-max border-gray-200 rounded-md"
    >
      <img
        className="h-24 border object-cover border-gray-300 rounded-md w-24"
        src={image}
      />
      <div className="flex flex-col pr-10">
        <h1 className="text-secondary font-regular uppercase">{category}</h1>
      </div>
    </li>
  );
};

export default Category;
