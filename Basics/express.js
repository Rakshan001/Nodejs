// Importing required modules
const express = require('express');
const morgan = require('morgan');
const userModal = require('./models/user'); // Mongoose user model
const dbConnection = require('./config/db'); // Database connection file

// Initializing Express app
const app = express();

// --------------------------------------------------
// Middleware Setup
// --------------------------------------------------

// Parse incoming JSON requests
app.use(express.json())

// Parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }))

// Serve static files like CSS, JS, images from the "public" folder
app.use(express.static("public"))

// HTTP request logger middleware
app.use(morgan("dev"))

// Custom middleware to demonstrate middleware usage
app.use((req, res, next) => {
    console.log("This is the Middle ware");
    return next(); // Pass control to the next middleware/route handler
})

// --------------------------------------------------
// View Engine Setup
// --------------------------------------------------

// Set EJS as the template engine (allows using .ejs files in "views" folder)
app.set("view engine", "ejs")

// --------------------------------------------------
// Route Handlers
// --------------------------------------------------

// Home route with custom middleware example
app.get('/', (req, res, next) => {
    console.log("custom middle ware");
    next(); // Proceed to next handler
}, (req, res) => {
    res.render("index") // Renders index.ejs
});

// About page route (simple text response)
app.get('/about', (req, res) => {
    res.send("About Page")
});

// --------------------------------------------------
// Handling Form Submissions
// --------------------------------------------------

// POST route to receive form data
app.post('/get-from-data', (req, res) => {
    console.log(req.body);   // Logs form data sent in the request body
    console.log(req.query);  // Logs query parameters if any (optional)
    res.send("Data received") // Sends response back to client
});

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

// --------------------------------------------------
// Start the Server
// --------------------------------------------------

// Starts the Express server on port 3000
app.listen(3000)
