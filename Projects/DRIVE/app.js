const express = require('express');
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv');

dotenv.config();

const connectToDb = require('./config/db');
connectToDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")


app.use('/',userRouter);
// app.get('/',(req,res)=>{
//     // res.send("Hellow World");
//     res.render("index")
// })
app.listen(3000);