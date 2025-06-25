const express = require('express');
const userRouter = require('./routes/user.routes')

const app = express();
app.set("view engine","ejs")


app.use('/',userRouter);
// app.get('/',(req,res)=>{
//     // res.send("Hellow World");
//     res.render("index")
// })
app.listen(3000);