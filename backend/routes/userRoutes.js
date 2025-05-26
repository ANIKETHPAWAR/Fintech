const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/User");
const {jwtAuthMiddleware,generateToken} = require('./../auth')

/// signup token
router.post('/signup',async (req,res)=>{
    try{
    const data = req.body;
    const newUser =new User(data);
    const savedUser=await newUser.save()
    console.log('data saved');

    // generating new token
const payLoad ={
  id: savedUser.username,
 
}
const token = generateToken(payLoad);
console.log('your token is :' ,token);
    res.status(200).json({savedUser,token : token})
    }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal error'})
    }
    
     })
/// login routes token 

router.post('/signin',async (req,res)=>{


try{
const {username,password} = req.body;

const user = await User.findOne({username:username});

if(!user || !(await user.comparePassword(password))){
return response.status(401).json({error: 'user didnt match'})
}

const payLoad = {
  id :user.username,
  

}

const token = generateToken(payLoad);
res.json({token})


}
catch(err){
console.error(err);
res.status(500).json({error: 'interal server error'})
}

})
module.exports = router;