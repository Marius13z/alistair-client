import { StarIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/posts-slice";
import CategorySkeleton from "../../Skeleton/CategorySkeleton";
import Category from "./Category";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, categoriesStatus } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div
      className="bg-white border border-gray-200 rounded-r-xl shadow-md 
    px-8 pt-5 pb-10 space-y-10 rounded-lg flex-col sticky top-5"
    >
      <div className="flex justify-between">
        <h1 className="text-secondary font-bold">TOP CATEGORIES</h1>
        <StarIcon className="h-5 text-primary" />
      </div>

      {categoriesStatus === "loading" ? (
        <CategorySkeleton cards={4} />
      ) : (
        <ul>
          {categories?.map((category) => (
            <Category
              image={category.image}
              category={category.category}
              key={category._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
