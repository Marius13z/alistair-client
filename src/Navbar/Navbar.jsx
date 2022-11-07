import React, { useState } from "react";
import { HomeIcon, MenuAlt1Icon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { ArrowSmDownIcon, StarIcon } from "@heroicons/react/solid";
import NavbarSearch from "./NavbarSearch";
import CreateBtn from "./CreateBtn";
import NavbarUser from "./NavbarUser";
import { useGetUserQuery } from "../features/userApiSlice";
import { useGetCategoriesQuery } from "../features/postsApiSlice";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: categories } = useGetCategoriesQuery();
  const { data: user } = useGetUserQuery();

  return (
    <nav>
      <ul className="flex md:items-center justify-between px-12 py-4 md:py-2 ">
        {/* Left side */}
        <li>
          <ul className="flex items-center space-x-40">
            <li>
              <Logo />
            </li>
            <li className="hidden xl:flex space-x-2">
              <HomeIcon className="xl:h-6" />
              <p className=" font-medium text-secondary">Main Stream</p>
              <div className="h-0.5 w-6 relative top-6 right-[143px] bg-accent"></div>
            </li>
          </ul>
        </li>

        {/* Middle */}
        <li>
          <ul className="flex items-center lg:space-x-28">
            <li className="hidden md:block">
              <ul className="flex items-center space-x-3">
                <NavbarSearch setOpenMenu={setOpenMenu} openMenu={openMenu} />

                <CreateBtn user={user} />
              </ul>
            </li>

            {/* Right side*/}
            <li className=" hidden md:block">
              <NavbarUser user={user} />
            </li>
          </ul>
        </li>

        <li className="md:hidden">
          <MenuAlt1Icon
            onClick={() => setOpenMenu(!openMenu)}
            className="h-6 cursor-pointer text-secondary"
          />
        </li>
      </ul>
      {openMenu && (
        <>
          <ul className=" h-[100vh] hover:w-[58vw] duration-300 transition-all  md:hidden  flex flex-col pt-5  top-0 right-0 fixed w-[50vw] z-20 bg-body shadow-lg border-gray-200 border rounded-l-lg">
            <NavbarSearch menu setOpenMenu={setOpenMenu} openMenu={openMenu} />
            <li className="menu-li pl-0">
              <NavbarUser user={user} menu />
            </li>
            <li className="menu-li">
              <CreateBtn setOpenMenu={setOpenMenu} user={user} menu />
            </li>
            <li>
              <ul>
                <li className="menu-li">
                  <button className="menu-btn">
                    <ArrowSmDownIcon className="menu-icon" />
                    Categories
                  </button>
                </li>
                {categories?.map((category) => (
                  <li
                    onClick={() => setOpenMenu((prevState) => !prevState)}
                    key={category._id}
                    className="flex flex-col w-full "
                  >
                    <Link to={`/posts/category/${category.category}`}>
                      <button className="menu-btn py-3 pl-5 font-medium w-full text-start hover:bg-orange-200">
                        <StarIcon className="menu-icon text-accent" />
                        {category.category.toUpperCase()}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div
            onClick={() => setOpenMenu(false)}
            className="fixed md:hidden top-0 w-[100vw] cursor-pointer h-[100vh] opacity-80 bg-gray-100 z-10"
          ></div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
