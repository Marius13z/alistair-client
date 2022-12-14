import { GoogleLogin } from "@react-oauth/google";
import { ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";
import AuthForm from "./AuthForm";
import Logo from "../../Logo";
import {
  useLoginMutation,
  useRegisterMutation,
  useSigninWithGoogleMutation,
} from "../../features/userApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  const [signInWithGoogle] = useSigninWithGoogleMutation();

  const [
    login,
    { error: loginError, reset: resetLoginErrors, isSuccess: loggedIn },
  ] = useLoginMutation();
  const [
    register,
    { error: registerError, reset: resetRegisterErrors, isSuccess: signedUp },
  ] = useRegisterMutation();

  // store data typed from input field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // sign up and sign in function
  const onSubmit = async (e) => {
    e.preventDefault();

    // check if passwords match
    if (!loginForm && formData.confirmPassword !== formData.password) {
      toast.error("Your passwords don't match");
      return null;
    }

    // if user is on the registration form
    if (loginForm === false) {
      // sign up user
      register(formData);
    } else if (loginForm === true) {
      // sign in user

      login(formData);
    }

    // reset the form on submit
    e.target.reset();
  };

  // everytime a new register or login error appears run this effect to display the error on user screen
  useEffect(() => {
    // reset login and register errors to avoid the cached errors and perform proper validation
    resetLoginErrors();
    resetRegisterErrors();

    // if it's an register / login error show a toast error with the name of the error
    if (registerError || loginError) {
      toast.error(registerError?.data || loginError?.data);
      // go to homepage if there are no errors
    } else if (loggedIn || signedUp) {
      navigate("/");

      // display popup notif so user knows he's logged in
      toast.success("You have successfuly signed in");
    }
  }, [registerError, loginError, loggedIn, signedUp]);

  const handleOAuthLogin = async (res) => {
    // decode jwt token to get credentials
    const { name, email, picture } = jwtDecode(res?.credential);

    // save user data in local storage
    signInWithGoogle({ name, email, picture });

    // navigate to / once the user is logged in
    navigate("/");

    // sign in pop up
    toast.success("You successfuly signed in!");
  };

  return (
    <main className="flex h-[100vh] bg-white">
      <div className=" rounded-r-xl border border-gray-100 bg-body w-full lg:max-w-lg items-center lg:items-start space-y-8 flex flex-col px-24 justify-center">
        <div className="flex relative right-16 lg:right-0 items-center space-x-2">
          <Logo />
        </div>
        <div className=" flex flex-col">
          <AuthForm
            handleChange={handleChange}
            onSubmit={onSubmit}
            loginForm={loginForm}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <button
            onClick={() => setLoginForm((prevState) => !prevState)}
            className="flex items-center mt-2 group space-x-2"
          >
            <h1 className="text-secondary cursor-pointer text-sm">
              {loginForm
                ? "You don't have an account?"
                : "You already have an account?"}
            </h1>
            <ArrowRightIcon className="h-4 text-primary group-hover:translate-x-2 transition-all duration-300" />
          </button>
          <div className="flex flex-col space-y-3 mt-12">
            <h1 className="text-secondary uppercase ml-1 font-medium">
              Also you can try
            </h1>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleOAuthLogin(credentialResponse);
              }}
              onError={() => {
                toast.error("Something went wrong, please try again!");
              }}
            />
          </div>
        </div>
      </div>
      <aside>
        <img
          className="h-0 w-0 lg:w-full lg:h-full"
          alt="illustration"
          src="./auth-illustration.png"
        />
      </aside>
    </main>
  );
};

export default Auth;
