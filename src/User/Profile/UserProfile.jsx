import {
  ArrowCircleLeftIcon,
  HeartIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserPosts } from "../../features/posts-slice";
import FileBase from "react-file-base64";
import {
  editUserDescription,
  editUserImage,
  fetchUser,
  followUser,
  logout,
} from "../../features/user-slice";
import Post from "../../Posts/Post/Post";
import CardSkeleton from "../../Skeleton/CardSkeleton";
import UserSkeleton from "../../Skeleton/UserSkeleton";

const UserProfile = () => {
  const [editDescription, setEditDescription] = useState(false);
  const [descriptionForm, setDescriptionForm] = useState({ description: "" });
  const { posts, status } = useSelector((state) => state?.posts);
  const { user, userStatus } = useSelector((state) => state?.user);
  // get user details
  const localUser = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = {
    followingUser: localUser?.username,
    followedUserId: user?._id,
  };

  // create empty arr to push every post like
  const likesArray = [];
  // for every post like get the length of the likes array and push it in the empty arr
  posts.forEach((post) => likesArray.push(post.likes.length).reduce);
  // calculate the sum of likes inside the arr
  const totalLikes = likesArray.reduce((acc, obj) => {
    return acc + obj;
  }, 0);

  const logoutUser = () => {
    dispatch(logout());

    navigate("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (descriptionForm.description.length === 0) {
      setEditDescription(false);

      return;
    }

    // edit user description state and post the new description to db
    dispatch(editUserDescription({ id, descriptionForm }));

    // close form
    setEditDescription(false);
  };

  const editDesc = () => {
    if (user !== undefined && user.username === localUser.username) {
      setEditDescription(true);
    }
  };

  // fetch user posts
  useEffect(() => {
    dispatch(fetchUserPosts(id));
  }, [dispatch, id]);

  // fetch user details
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  return (
    <main className="my-12 space-y-10">
      {userStatus === "loading" ? (
        <UserSkeleton big cards={1} />
      ) : (
        <section className="flex px-2 md:px-12 relative space-x-7">
          <div className="group relative">
            <img
              className="rounded-md w-32 object-cover bg-white border h-36 p-1"
              referrerPolicy="no-referrer"
              src={
                user?.image ||
                localUser?.image ||
                "https://i.ibb.co/mbH7CdH/profilepic2.png"
              }
            />
            {user?.username === localUser?.username && (
              <div className="w-0 h-0 px-3 group-hover:h-32 cursor-pointer group-hover:w-28 z-10 transition-all duration-300 flex items-center justify-center top-2 right-2 absolute">
                <FileBase
                  type="file"
                  onDone={({ base64 }) =>
                    dispatch(editUserImage({ image: base64, id }))
                  }
                  multiple={false}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex space-x-2 items-center">
              <p className="font-regular text-lg ">{id}</p>
              <button type="button" onClick={logoutUser}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer hover:text-primary transition-all duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-3 pb-1">
              <button
                disabled={
                  user?.username === localUser?.username ||
                  id === localUser?.username ||
                  !localUser
                }
                onClick={() => dispatch(followUser(userData))}
                type="button"
                className="disabled:bg-gray-200 disabled:hover:border-gray-200 disabled:text-secondary text-xs bg-white border py-1 px-3 rounded-md text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                {user?.followers?.find((user) => user === localUser?.username)
                  ? "Unfollow"
                  : "Follow"}
              </button>
              <div className="flex items-center space-x-1">
                <HeartIcon className="h-5 text-red-500" />
                <span className="text-gray-300 text-xs">{totalLikes}</span>
              </div>
            </div>
            {editDescription ? (
              <form className="relative" onSubmit={onSubmit}>
                <textarea
                  onChange={(e) =>
                    setDescriptionForm({ description: e.target.value })
                  }
                  maxLength="80"
                  placeholder="Describe yourself in a few words"
                  className="h-[4.5rem] rounded-md w-60 md:w-72 p-1.5 text-secondary border border-gray-200 outline-none text-xs shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute bottom-4 right-2 text-xs hover:bg-primary transition-all duration-300 bg-accent text-white p-1 border rounded-md border-gray-200 w-12"
                >
                  EDIT
                </button>
              </form>
            ) : (
              <p
                onClick={editDesc}
                className="text-xs cursor-pointer hover:p-1.5 rounded-md transition-all duration-300 hover:bg-gray-200 text-gray-500 max-w-[35ch] md:max-w-[50ch]"
              >
                {user?.description ||
                  "I don't have a description yet but i'm planning to make one as soon as possible, so keep in touch and like my posts!"}
              </p>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="px-4 md:px-12 flex items-center hover:text-primary text-sm lg:text-base transition-all duration-300  space-x-2"
      >
        <ArrowCircleLeftIcon className="h-5" />
        <span>Go back to Home Page</span>
      </button>
      <section>
        <ul className="flex flex-col px-2 md:px-12 ">
          {status === "loading" ? (
            <CardSkeleton cards={2} />
          ) : (
            <>
              {posts?.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </>
          )}
        </ul>
      </section>
    </main>
  );
};

export default UserProfile;
