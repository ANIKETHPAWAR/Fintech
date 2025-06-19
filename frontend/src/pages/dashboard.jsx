import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import {Users }from "../components/Usercomp"
export const Dashboard =()=>{
    
       return <div>
         <Appbar />
         <div className="m-8">
            <Balance value={"10000"}/>
           
         </div>
         <div>
          <Users />
         </div>
         </div>
               
}