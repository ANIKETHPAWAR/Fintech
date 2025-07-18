import { useState,useEffect } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users =()=>{
    const navigate=useNavigate();
    const [users,setUsers]=useState([]);
    const[filter,setFilter]=useState("");
    const[currentUserId,setCurrentUserId]=useState(null);
   
    useEffect(()=>{
        const fetchme=async()=>{
            try{
                const res = await axios.get("http://localhost:3000/api/v1/user/me",{
                     headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
                }); setCurrentUserId(res.data.id)
            } catch(err){
                 console.error("Failed to fetch /me:", err);
            }
        };
        fetchme();
    },[]);



    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then(response=>{
   const filteredUsers = response.data.user.filter(
          (user) => user._id !== currentUserId
        );
        setUsers(filteredUsers);
            
        })
    },[filter,currentUserId])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-xl px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>


function User({user}) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e)=>{
           navigate('/send?id='+user._id +"&name="+user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}
}