import { createContext,useState,useEffect } from "react";
import axios from "axios"

export const AuthContext=createContext()

export const AuthProvider=({children})=>{

const [user,setUser]=useState(null)
const [loading,setLoading]=useState(false)


 const login = async (userInfo) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        userInfo,
        { withCredentials: true }
      );

      setUser(res.data.user);

      return res.data;

    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };



  const register = async (userInfo) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        userInfo,
        { withCredentials: true }
      );

      setUser(res.data.user);

      return res.data;

    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };


  return(
    <AuthContext.Provider value={{user,loading,login,register}} >
{children}
    </AuthContext.Provider>
  )

}