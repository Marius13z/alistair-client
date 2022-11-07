import React from "react";
import Feed from "../Feed/Feed";
import Navbar from "../Navbar/Navbar";

const HomeLayout = ({ category, search }) => {
  return (
    <>
      <Navbar />
      <Feed search={search} category={category} />
    </>
  );
};

export default HomeLayout;
