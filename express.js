const express=require('express');
const morgan = require('morgan');

const app =express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"))

///Middle ware

app.use((req,res,next) =>{
    console.log("This is the Middle ware")
    return next();
})

app.set("view engine", "ejs")

// app.get('/',(req,res) =>{
//     res.send("Hello World")
// });

app.get('/',(req,res,next) =>{
    console.log("custom middle ware")
    next()
}, (req,res) =>{
    res.render("index")
});

app.get('/about',(req,res) =>{
    res.send("About Page")
});


// app.get('/get-from-data',(req,res) =>{
//     console.log(req.query)
//     res.send("Data received")
// })

app.post('/get-from-data',(req,res) =>{
    console.log(req.body)
    res.send("Data received")
})


    
app.listen(3000)
