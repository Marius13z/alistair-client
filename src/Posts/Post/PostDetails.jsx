import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCommentPostMutation,
  useGetPostQuery,
} from "../../features/postsApiSlice";
import { useGetUserQuery } from "../../features/userApiSlice";
import Navbar from "../../Navbar/Navbar";
import CardSkeleton from "../../Skeleton/CardSkeleton";
import Comments from "../Comments/Comments";

const PostDetails = () => {
  const { data: user } = useGetUserQuery();
  const [formData, setFormData] = useState({
    message: "",
    username: user?.username,
    image: user?.image,
  });
  const ref = useRef();
  const { id } = useParams();
  const [commentPost] = useCommentPostMutation();

  const { data: post, isLoading } = useGetPostQuery(id);

  const onSubmit = (e) => {
    // prevent default refresh behavior
    e.preventDefault();

    // create a comment on a specific post
    commentPost({ id: id, data: formData });

    // clear form
    e.target.reset();
  };

  let comments;
  comments = post?.comments?.map((comment) =>
    comment.map((comm, i) => <Comments key={i + 1} comments={comm} />)
  );

  return (
    <>
      <Navbar />
      {isLoading ? (
        <CardSkeleton cards={1} big />
      ) : (
        <div
          key={post._id}
          className="relative flex my-16 space-y-7 flex-col px-5 py-5 mx-10 rounded-lg bg-white border border-gray-200"
        >
          <div className="flex items-center space-x-6">
            <img
              className="h-24 self-start w-24 object-cover p-1 rounded-md border border-gray-200"
              src={post.image || "../profilepic2.png"}
              alt="profile pic"
            />
            <ul className="flex flex-col space-y-1">
              <li>
                <h1 className="text-secondary  font-medium">{post.title}</h1>
              </li>
              <li>
                <p className="text-secondary text-xs lg:text-sm font-light">
                  {post.message}
                </p>
              </li>
            </ul>
          </div>

          {comments}

          <form onSubmit={onSubmit}>
            <textarea
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              className="w-full placeholder:text-gray-400 border p-3 text-xs outline-none text-secondary border-gray-200 rounded-lg h-40"
            />

            <button
              disabled={!user}
              type="submit"
              className="disabled:bg-gray-300 absolute bottom-[38px] w-36 right-7 text-xs btn-primary mt-5"
            >
              SEND COMMENT
            </button>
          </form>
          {/* <button className="font-medium mt-4 self-center w-60 text-sm py-1 text-primary border-b-2 border-gray-200">
         SEE MORE
       </button> */}
        </div>
      )}
    </>
  );
};

export default PostDetails;
