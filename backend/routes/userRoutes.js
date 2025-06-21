const express = require("express");
const app = express();
const router = express.Router();
const { User, Account } = require("../models/User"); // Destructure User and Account
const {jwtAuthMiddleware,generateToken} = require('./../auth')

//test
router.get('/test', (req, res) => {
  res.send('Test route works');
});
/// signup token
router.post('/signup',async (req,res)=>{
    try{
    const data = req.body;
    const newUser =new User(data);
    const savedUser=await newUser.save()
    console.log('data saved');

    // generating new token
const payLoad ={
  id: savedUser._id,
 
}
await Account.create({
      userId: savedUser._id,
      balance: 1 + Math.random() * 10000
    });
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
return res.status(401).json({error: 'user didnt match'})
console.log('user not found');
}
console.log('Authenticating user:', username);


const payLoad = {
  id :user._id,
  

}

const token = generateToken(payLoad);
res.json({token})

 console.log('Token sent for user:', username);
}
catch(err){
console.error(err);
res.status(500).json({error: 'interal server error'})
}

})
// route to update password
router.put('/updatepassword',jwtAuthMiddleware,async(req,res)=>{
  try{
const  newId = req.body.username;
const {password,newPassword} = req.body
console.log('Requested username:', newId);


const Response = await User.findOne({username:newId});
console.log('User found:', Response);
 if (!Response) {
      return res.status(404).json({ error: 'User not found' });
    }
if(!(await Response.comparePassword(password))){
return res.status(401).json({error: 'user didnt match'})
}
// password matches then
Response.password = newPassword;
await Response.save();

res.status(200).json({message:'Password Updated!!'});
console.log('data updated')
if(!Response){
  return res.status(404).json({error:'not found'})
}
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal error'})

  }
})
router.get("/me",jwtAuthMiddleware, async(req,res)=>{
  try{
    console.log("Inside /me route", req.user);

    const userId=req.user.id;
 const user=await User.findById(userId);
 const account = await Account.findOne({userId:userId});
  if (!user || !account) {
      return res.status(404).json({ error: "User or account not found" });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      balance: account.balance,
      id:userId
    });
  }catch(err){
res.status(500).json({ error: "Something went wrong" });
  }
})

// route to search users to send money
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
 res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
   
})
module.exports = router;