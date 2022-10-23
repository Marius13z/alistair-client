import { SearchIcon } from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarSearch = ({ menu, openMenu, setOpenMenu }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef();
  const navigate = useNavigate();
  const handleSubmitSearch = (e) => {
    // prevent default refresh behavior
    e.preventDefault();

    if (searchTerm === "") return;

    // navigate to the posts searched
    navigate(`/posts/${searchTerm}/search`);

    // close menu if open
    if (openMenu) {
      setOpenMenu(false);
    }

    // clear form
    ref.current.reset();
  };

  return (
    <li>
      <form
        ref={ref}
        className={`flex items-center p-1 ${
          menu
            ? "flex-row-reverse w-full pl-4 bg-orange-300"
            : "border border-gray-200 w-[300px] shadow-md lg:w-[320px] xl:w-[350px] px-2 2xl:w-[570px] bg-white  rounded-lg"
        }`}
        onSubmit={handleSubmitSearch}
      >
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            menu ? "Search here..." : "Search for your favorite posts..."
          }
          className={`w-full text-xs py-2.5 outline-none ${
            menu && "pl-3 bg-orange-300 placeholder:text-secondary"
          }`}
        />
        <button type="submit">
          <SearchIcon className="h-6 text-secondary rounded-r-lg" />
        </button>
      </form>
    </li>
  );
};

export default NavbarSearch;
