import { UserIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

const NavbarUser = ({ localUser, user, menu }) => {
  console.log(localUser);
  return (
    <ul
      className={`flex items-center space-x-4 ${
        menu && "flex-row-reverse  justify-end"
      }`}
    >
      <li className={` ${menu ? "block" : "hidden lg:block"}`}>
        <p
          className={`text-secondary pl-2 font-medium ${
            localUser?.username?.length >= 10 && "max-w-[80px] truncate"
          }`}
        >
          {localUser?.username}
        </p>
      </li>
      <li>
        {localUser ? (
          <Link to={`/user/${localUser?.username}`}>
            <button className="h-12 w-12 border border-gray-200 bg-white rounded-md p-0.5">
              <img
                className="rounded-sm bg-white h-10 w-10 object-cover"
                alt="profile pic"
                referrerPolicy="no-referrer"
                src={user?.image || localUser?.image}
              />
            </button>
          </Link>
        ) : (
          <Link to="/auth">
            <button className="h-10 w-28 flex items-center justify-center bg-white border border-gray-200 rounded-md p-1">
              <UserIcon className="h-5 pr-2 text-secondary" />
              Login
            </button>
          </Link>
        )}
      </li>
    </ul>
  );
};

export default NavbarUser;
