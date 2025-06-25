const express =require('express');
const userModal =  require('./models/user');
const morgan = require('morgan')
const dbConnection = require('./config/db');

const app =express();
// Parse incoming JSON requests
app.use(express.json())

// Parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }))

// Serve static files like CSS, JS, images from the "public" folder
app.use(express.static("public"))

// HTTP request logger middleware
app.use(morgan("dev"))

// Set EJS as the template engine (allows using .ejs files in "views" folder)
app.set("view engine", "ejs")


// --------------------------------------------------
// User Registration with Database
// --------------------------------------------------

// GET route to show the registration form
app.get('/register', (req, res) => {
    res.render('register') // Renders register.ejs
});

// POST route to handle user registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Destructure form data

    // Store user data in the database
   const user = await userModal.create({
        username: username,
        email: email,
        password: password
    })

    console.log(req.body); // Log the form data
    res.send(user) // Renders a success page after registration
});


// app.get('/get-users',(req,res) =>{
//      userModal.find().then((user_data)=>{
//         res.send(user_data);
//      })
// }) 

app.get('/get-users',(req,res) =>{
     userModal.find({
        email:'rakshanshetty2003@gmail.com'
     }).then((user_data)=>{
        res.send(user_data);
     })
}) 

    // app.get('/get-users',(req,res) =>{
    //      userModal.findOne().then((user_data)=>{
    //         res.send(user_data);
    //      })
    // }) 



// app.get('/get-users',async (req,res) =>{
//     const result= await userModal.find();
//     res.send(result)
// })

app.get('/user-update', async (req,res) =>{
   await userModal.findOneAndUpdate({
        // email:'rakshanshetty2003@gmail.com',
        username:'Rakshan'
    },{
        email:'rakshanshetty2003@gmail.comUpdated',
    }).then((update_result)=>{
        res.send(update_result)
        res.send("User details Updated")
    })
})

app.get('/user-delete', async (req,res) =>{
    const result = await userModal.findOneAndDelete({
        username:"Rakshan"
    })
    
    res.send(result)
    res.send('User Deleted')
})
app.listen(4000);

