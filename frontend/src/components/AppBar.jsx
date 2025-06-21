import { useState,useEffect } from "react";
import axios from "axios";
export const Appbar = () => {
   const [user, setUser] = useState({ firstName: "", lastName: "", balance: 0 });
useEffect(() => {
  const fetchMe = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  fetchMe();
}, []);

    return <div className= "shadow h-14 flex justify-between bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 fixed top-0 left-0 right-0 w-full " >
        <div className="flex flex-col justify-center h-full ml-1 text-xl text-white font-bold px-3 ">ZapPay </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 text-white text-md">Welcome {user.firstName}</div>
       
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName && user.lastName
  ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
  : ""}


                </div>
            </div>
             </div>
    </div>
  
}