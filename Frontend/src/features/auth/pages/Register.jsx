import React, { useState,useContext } from "react"
import { Link } from "react-router-dom";
import axios from "axios"
import { AuthContext } from "../context/auth.context.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
const { user, register, loading } = useContext(AuthContext);
const navigation = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullname:"",
    username:"",
    email:"",
    password:""
  })
  const handleSubmit =async (e) => {
    e.preventDefault();
   try {
    const data= await register(userInfo)
    console.log(data.user)
    navigation("/login")
   } catch (error) {
       console.log(error.response?.data?.message);
   }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">

      <div className="w-full max-w-[350px]">

        {/* Register Card */}
        <div className="bg-white border border-gray-300 px-10 py-8">

          <h1
            className="text-center text-4xl font-semibold mb-5"
            style={{ fontFamily: "cursive" }}
          >
            Instagram
          </h1>

          <p className="text-center text-gray-500 font-semibold text-base mb-5">
            Sign up to see photos and videos from your friends.
          </p>

          <button
            type="button"
            className="w-full bg-[#0095f6] text-white rounded-lg py-2 font-semibold text-sm flex justify-center items-center gap-2"
          >
            <span className="font-bold text-lg">f</span>
            Log in with Facebook
          </button>

         
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs font-semibold text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit}  className="flex flex-col gap-2">

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
     setUserInfo({
      ...userInfo,
      email: e.target.value
    })}
              required
              className="w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-3 text-xs outline-none focus:border-gray-400"
            />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
               onChange={(e) =>
     setUserInfo({
      ...userInfo,
      fullname: e.target.value
    })}
              required
              className="w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-3 text-xs outline-none focus:border-gray-400"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
               onChange={(e) =>
     setUserInfo({
      ...userInfo,
      username: e.target.value
    })}
              required
              className="w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-3 text-xs outline-none focus:border-gray-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
               onChange={(e) =>
     setUserInfo({
      ...userInfo,
      password: e.target.value
    })}
              required
              className="w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-3 text-xs outline-none focus:border-gray-400"
            />

            <p className="text-center text-xs text-gray-500 leading-5 my-2">
              People who use our service may have uploaded your contact information to Instagram.
              <span className="text-[#00376b]"> Learn More</span>
            </p>

            <p className="text-center text-xs text-gray-500 leading-5 mb-2">
              By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
            </p>

            <button
              type="submit"
              className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-lg py-2 text-sm"
            >
              Sign up
            </button>

          </form>

        </div>

        {/* Login Link */}
        <div className="bg-white border border-gray-300 mt-3 py-5 text-center text-sm">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-[#0095f6] font-semibold"
          >
            Log in
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          © 2026 Instagram Clone
        </p>

      </div>
    </div>
  );
};

export default Register;
