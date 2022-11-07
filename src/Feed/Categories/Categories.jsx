import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import { useGetCategoriesQuery } from "../../features/postsApiSlice";
import CategorySkeleton from "../../Skeleton/CategorySkeleton";
import Category from "./Category";

const Categories = () => {
  const { data: categories, isSuccess, isLoading } = useGetCategoriesQuery();

  let content;
  if (isLoading) {
    content = <CategorySkeleton cards={4} />;
  } else if (isSuccess) {
    content = categories?.map((category) => (
      <Category
        image={category.image}
        category={category.category}
        key={category._id}
      />
    ));
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-r-xl shadow-md 
    px-8 pt-5 pb-10 space-y-10 rounded-lg flex-col sticky top-5"
    >
      <div className="flex justify-between">
        <h1 className="text-secondary font-bold">TOP CATEGORIES</h1>
        <StarIcon className="h-5 text-primary" />
      </div>

      <ul>{content}</ul>
    </div>
  );
};

export default Categories;
