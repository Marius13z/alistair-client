import React from "react";
import { useGetPopularPostsQuery } from "../../features/postsApiSlice";
import { useGetUserQuery, useGetUsersQuery } from "../../features/userApiSlice";
import CardSkeleton from "../../Skeleton/CardSkeleton";
import UserSkeleton from "../../Skeleton/UserSkeleton";
import RecommendedPost from "./RecommendedPosts/RecommendedPost";
import Suggestion from "./Suggestion";

const Suggestions = () => {
  const { data: follower } = useGetUserQuery();
  const {
    data: posts,
    isSuccess: recommendedIsSuccess,
    isLoading: recommendedIsLoading,
  } = useGetPopularPostsQuery();
  const {
    data: followees,
    isSuccess: suggestionsSuccess,
    isLoading: suggestionsLoading,
  } = useGetUsersQuery(follower?.username);

  let recommended;
  if (recommendedIsLoading) {
    recommended = <CardSkeleton cards={2} small />;
  } else if (recommendedIsSuccess) {
    recommended = posts?.map((post) => (
      <RecommendedPost post={post} key={post._id} />
    ));
  }

  let suggestions;
  if (suggestionsLoading) {
    suggestions = <UserSkeleton cards={3} />;
  } else if (suggestionsSuccess) {
    suggestions = (
      <ul>
        {followees
          ?.map((followee) => (
            <Suggestion
              key={followee._id}
              follower={follower}
              followee={followee}
            />
          ))
          .slice(0, 3)}
      </ul>
    );
  }

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

        <ul>{recommended}</ul>

        <li>
          <ul className="flex-col mt-10">
            <li>
              <h1 className="text-secondary text-sm font-bold">
                FRIEND SUGGESTIONS
              </h1>
            </li>
            <li>{suggestions}</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Suggestions;
