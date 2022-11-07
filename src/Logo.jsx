import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex space-x-3  cursor-pointer items-center"
    >
      <img className="w-7" src="../../logoE.png" alt="logo" />
      <p className=" font-bold text-xl md:text-2xl text-secondary">
        Ali<span className="text-primary">stair</span>
      </p>
    </button>
  );
};

export default Logo;
