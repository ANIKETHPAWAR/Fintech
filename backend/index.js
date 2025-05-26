const express = require("express");
// const mainRouter = require("./routes/");
const app =express();

// app.use("api/v1", mainRouter);
app.get('/',(req,res)=>{
    res.send('Welcome')
})
app.listen(3000 ,()=>{
    console.log('running on 3k')
})
