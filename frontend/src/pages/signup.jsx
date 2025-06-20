import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/inputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signup = () => {
  const Navigate=useNavigate();
  const [firstName,setFirstName]=useState("");
  const [lastName,setlastName]=useState("");
  const [username,setusername]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
       
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox Onchange={(e)=>{
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox  Onchange={(e)=>{
          setlastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox  Onchange={(e)=>{
          setEmail(e.target.value);
        }} placeholder="example@gmail.com" label={"Email"} />
        <InputBox Onchange={(e)=>{
          setusername(e.target.value);
        }} placeholder="John91" label={"Username"} />
        <InputBox Onchange={(e)=>{
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
         const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
            firstName,
            lastName,  
            username,
             email,
            password

          });
          localStorage.setItem("token",response.data.token);
          Navigate("/dashboard")
        }} label={"Sign up"} />
        </div>
        <BottomWarning  label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}

