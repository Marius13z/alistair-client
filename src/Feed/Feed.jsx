import React from "react";
import { useParams } from "react-router-dom";
import Post from "../Posts/Post/Post";
import PostForm from "../Form/PostForm";
import Categories from "./Categories/Categories";
import Suggestions from "./Suggestions/Suggestions";
import CardSkeleton from "../Skeleton/CardSkeleton";
import {
  useGetCategoryPostsQuery,
  useGetPostsQuery,
  useGetSearchedPostsQuery,
} from "../features/postsApiSlice";
import { useSelector } from "react-redux";

const Feed = ({ category, search }) => {
  const { id } = useParams();
  const { data: categoryPosts } = useGetCategoryPostsQuery(id);
  const { data: searchedPosts } = useGetSearchedPostsQuery(id);
  const { data: posts, isSuccess, isLoading } = useGetPostsQuery();
  const { createFormOpen } = useSelector((state) => state?.posts);

  let content;
  if (isLoading) {
    content = <CardSkeleton cards={5} />;
  } else if (isSuccess) {
    content = (search ? searchedPosts : category ? categoryPosts : posts)?.map(
      (post) => {
        return <Post key={post?._id} post={post} />;
      }
    );
  }

  return (
    <main className="flex justify-center md:space-x-10  py-8  ">
      <section className="hidden xl:block relative">
        <Categories />
      </section>
      <section className="grow">
        {createFormOpen && <PostForm />}

        {category && (
          <div className="max-w-full bg-white border flex justify-between  mx-10 md:mx-0 items-center border-gray-200 pl-5 rounded-xl mb-5">
            <span className="text-sm text-secondary font-semibold">
              {id.toUpperCase()}
            </span>
            <div className="w-12 bg-primary h-12 rounded-r-xl"></div>
          </div>
        )}

        {content}
      </section>
      <section className="hidden md:block relative">
        <Suggestions />
      </section>
    </main>
  );
};

export default Feed;
