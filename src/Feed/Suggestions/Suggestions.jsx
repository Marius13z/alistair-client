import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPosts } from "../../features/posts-slice";
import { fetchUsers } from "../../features/user-slice";
import CardSkeleton from "../../Skeleton/CardSkeleton";
import UserSkeleton from "../../Skeleton/UserSkeleton";
import RecommendedPost from "./RecommendedPosts/RecommendedPost";
import Suggestion from "./Suggestion";

const Suggestions = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const { users, userStatus } = useSelector((state) => state.user);
  const { popularPosts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    // fetch available users to follow
    dispatch(fetchUsers(user?.username));
  }, [dispatch]);

  useEffect(() => {
    // fetch popular posts
    dispatch(fetchPopularPosts());
  }, [dispatch]);

  return (
    <div className="bg-tertiary rounded-l-xl max-w-[280px] px-8 py-5 sticky top-5">
      <ul className="flex flex-col ">
        <li>
          <ul className="flex justify-between space-x-24">
            <li>
              <h1 className="text-secondary text-sm font-bold">
                POPULAR POSTS
              </h1>
            </li>
            <li>
              <h1 className="text-primary text-sm font-bold">MORE</h1>
            </li>
          </ul>
        </li>

        <li>
          {status === "loading" ? (
            <CardSkeleton cards={2} small />
          ) : (
            <ul>
              {popularPosts?.map((post) => (
                <RecommendedPost key={post._id} post={post} />
              ))}
            </ul>
          )}
        </li>

        <li>
          <ul className="flex-col mt-10">
            <li>
              <h1 className="text-secondary text-sm font-bold">
                FRIEND SUGGESTIONS
              </h1>
            </li>
            <li>
              {userStatus === "loading" ? (
                <UserSkeleton cards={3} />
              ) : (
                <ul>
                  {users
                    ?.map((user) => <Suggestion key={user._id} user={user} />)
                    .slice(0, 3)}
                </ul>
              )}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Suggestions;
