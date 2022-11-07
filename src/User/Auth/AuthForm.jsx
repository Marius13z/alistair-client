import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import React from "react";
import Input from "../../Form/Input";

const AuthForm = ({
  handleChange,
  onSubmit,
  showPassword,
  setShowPassword,
  loginForm,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3 mb-3">
      {!loginForm && (
        <Input
          minlength="4"
          maxlength="12"
          type="text"
          name="username"
          handleChange={handleChange}
          label="Username"
          text="example: abcdef"
        />
      )}
      <Input
        minlength="10"
        maxlength="42"
        size="12"
        type="email"
        name="email"
        handleChange={handleChange}
        label="Email"
        text="abcd@gmail.com"
      />
      <Input
        minlength="8"
        maxlength="32"
        type={showPassword ? "text" : "password"}
        name="password"
        handleChange={handleChange}
        label="Password"
        text="Type the password here"
      />
      {!loginForm && (
        <Input
          minlength="8"
          maxlength="32"
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          handleChange={handleChange}
          label="Confirm Password"
          text="Confirm the password above"
        />
      )}

      {!loginForm ? (
        showPassword ? (
          <EyeIcon
            onClick={() => setShowPassword(false)}
            className="eye-icon"
          />
        ) : (
          <EyeOffIcon
            onClick={() => setShowPassword(true)}
            className="eye-icon"
          />
        )
      ) : (
        <div></div>
      )}
      <button
        type="submit"
        className="w-full bg-accent hover:bg-primary transition duration-300 text-white font-medium uppercase rounded-full p-2"
      >
        {!loginForm ? "Register now" : "Login now"}
      </button>
    </form>
  );
};

export default AuthForm;
