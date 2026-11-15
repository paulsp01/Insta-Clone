import React, { useState,useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Login = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: ""
  })
 const { user, login, loading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
try {
   const data = await login(userInfo);

    console.log(data.user);
        navigate(`/feed`);
} catch (error) {
   console.log(error.response?.data?.message);
}

     
      
    }
  

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">

      <div className="w-full max-w-[350px]">

   
        <div className="bg-white border border-gray-300 px-10 py-10">

          <h1
            className="text-center text-4xl font-semibold mb-10"
            style={{ fontFamily: "cursive" }}
          >
            Instagram
          </h1>

       
<form onSubmit={handleSubmit} className="flex flex-col gap-2">

  <input
    type="text"
    name="username"
    placeholder="Username"
    value={userInfo.username}
    onChange={(e) =>
      setUserInfo({ ...userInfo, username: e.target.value })
    }
    autoComplete="username"
    className="w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-3 text-xs outline-none focus:border-gray-400"
  />


  <div className="flex items-center justify-center gap-4 my-1">
 
    <span className="text-xs text-center font-semibold text-gray-500">OR</span>
 
  </div>

  <input
    type="email"
    name="email"
    placeholder="Email"
    value={userInfo.email}
    onChange={(e) =>
      setUserInfo({ ...userInfo, email: e.target.value })
    }
    autoComplete="email"
    className="w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-3 text-xs outline-none focus:border-gray-400"
  />

  <input
    type="password"
    name="password"
    placeholder="Password"
    value={userInfo.password}
    onChange={(e) =>
      setUserInfo({ ...userInfo, password: e.target.value })
    }
    autoComplete="current-password"
    required
    className="w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-3 text-xs outline-none focus:border-gray-400"
  />

  

  <button
    type="submit"
   disabled={loading}
    className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-lg py-2 mt-2 text-sm"
  >
   {loading ? "Logging in..." : "Log in"}
  </button>

</form>


     
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs font-semibold text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

     
          <button className="w-full flex items-center justify-center gap-2 text-[#385185] font-semibold text-sm">
            <span className="text-xl font-bold">f</span>
            Log in with Facebook
          </button>

          <Link
            to="/forgot-password"
            className="block text-center text-xs text-[#00376b] mt-5"
          >
            Forgot password?
          </Link>

        </div>

        {/* Register Link */}
        <div className="bg-white border border-gray-300 mt-3 py-5 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#0095f6] font-semibold"
          >
            Sign up
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          © 2026 Instagram Clone
        </p>

      </div>
    </div>
  );
};

export default Login;
