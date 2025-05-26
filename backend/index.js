const express = require("express");
 const mainRouter = require("./routes/mainRouter");
 const cors = require("cors"); 
 const db = require('./db')
const app =express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", mainRouter);
app.get('/',(req,res)=>{
    res.send('Welcome')
})
app.listen(3000 ,()=>{
    console.log('running on 3k')
})
