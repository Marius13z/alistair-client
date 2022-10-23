import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCategoryPost,
  fetchPosts,
  fetchSearchedPosts,
} from "../features/posts-slice";
import Post from "../Posts/Post/Post";
import PostForm from "../Form/PostForm";
import Categories from "./Categories/Categories";
import Suggestions from "./Suggestions/Suggestions";
import CardSkeleton from "../Skeleton/CardSkeleton";

const Feed = ({ category, search }) => {
  const { posts, open, status, error, searchStatus } = useSelector(
    (state) => state?.posts
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch all posts on feed
    category
      ? dispatch(fetchCategoryPost(id))
      : search
      ? dispatch(fetchSearchedPosts(id))
      : dispatch(fetchPosts());
  }, [dispatch, id]);

  let content;
  if (status === "loading" || searchStatus === "loading") {
    content = <CardSkeleton cards={5} />;
  } else if (status === "succeeded" || searchStatus === "succeeded") {
    content = posts.map((post) => <Post key={post._id} post={post} />);
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <main className="flex justify-center md:space-x-10  py-8  ">
      <section className="hidden xl:block relative">
        <Categories />
      </section>
      <section className="grow">
        {open && <PostForm />}

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
