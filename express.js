const express=require('express');

const app =express();

app.set("view engine", "ejs")

// app.get('/',(req,res) =>{
//     res.send("Hello World")
// });

app.get('/',(req,res) =>{
    res.render("index")
});

app.get('/about',(req,res) =>{
    res.send("About Page")
});



///Middle ware

app.use((req,res,next) =>{
    console.log("This is the Middle ware")
    return next();
})

app.listen(3000)
