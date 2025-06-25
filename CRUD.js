// Import required modules
const express = require('express');
const userModal = require('./models/user'); // MongoDB Mongoose model
const morgan = require('morgan');
const dbConnection = require('./config/db'); // Database connection file

// Initialize Express application
const app = express();

// --------------------------------------------------
// Middleware Setup
// --------------------------------------------------

// Parse JSON-formatted request bodies
app.use(express.json());

// Parse URL-encoded data (used for HTML form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images) from the "public" directory
app.use(express.static("public"));

// Use Morgan to log HTTP requests in the console (useful for debugging)
app.use(morgan("dev"));

// Set EJS as the view engine to render dynamic HTML pages
app.set("view engine", "ejs");

// --------------------------------------------------
// User Registration with MongoDB
// --------------------------------------------------

// GET /register – Renders the registration form to the user
// This displays the "register.ejs" template when the route is accessed
app.get('/register', (req, res) => {
    res.render('register'); // Load the form UI
});

// POST /register – Handles form submission and stores user data in DB
// It extracts data from form and saves to MongoDB using Mongoose
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Get data from form

    // Save user to database
    const user = await userModal.create({
        username: username,
        email: email,
        password: password
    });

    console.log(req.body); // Log data for verification
    res.send(user); // Respond with stored user object
    // In real-world apps, you should not send sensitive data like passwords back
});

// --------------------------------------------------
// User Retrieval Routes
// --------------------------------------------------

// GET /get-users – Retrieves all users with a specific email from the DB
// Uses find() with a filter to get all matching entries
app.get('/get-users', (req, res) => {
    userModal.find({
        email: 'rakshanshetty2003@gmail.com' // Filter condition
    }).then((user_data) => {
        res.send(user_data); // Send matching users as JSON
    });
});

// Alternate Option: (Commented out)
// GET /get-users – Retrieves one user using findOne()
// app.get('/get-users', (req, res) => {
//     userModal.findOne().then((user_data) => {
//         res.send(user_data); // Sends first user found
//     });
// });

// Alternate Option: (Commented out)
// GET /get-users – Retrieves all users (no filters)
// app.get('/get-users', async (req, res) => {
//     const result = await userModal.find(); // Get all users
//     res.send(result); // Return user list
// });

// --------------------------------------------------
// User Update Route
// --------------------------------------------------

// GET /user-update – Finds a user and updates their email
// Uses findOneAndUpdate() to match based on username and update email
app.get('/user-update', async (req, res) => {
    await userModal.findOneAndUpdate(
        {
            // Match user by username
            username: 'Rakshan'
        },
        {
            // Set new email
            email: 'rakshanshetty2003@gmail.comUpdated'
        }
    ).then((update_result) => {
        res.send(update_result); // Respond with updated user object

        // ❌ This line will not be executed — res.send can be used only once per response
        // res.send("User details Updated");
    });
});

// --------------------------------------------------
// User Deletion Route
// --------------------------------------------------

// GET /user-delete – Finds and deletes a user by username
// Uses findOneAndDelete() to remove one matching record
app.get('/user-delete', async (req, res) => {
    const result = await userModal.findOneAndDelete({
        username: "Rakshan" // Match condition
    });

    res.send(result); // Send deleted user info

    // ❌ Like above, this second res.send() will not run (only one response allowed)
    // res.send('User Deleted');
});

// --------------------------------------------------
// ✅ EXTRA CRUD Operations (For REferences)
// --------------------------------------------------

// GET /users – Get all users (no filter)
app.get('/users', async (req, res) => {
    try {
        const users = await userModal.find();
        res.send(users);
    } catch (err) {
        res.status(500).send("Error retrieving users");
    }
});

// GET /user/:id – Get single user by ID
app.get('/user/:id', async (req, res) => {
    try {
        const user = await userModal.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.send(user);
    } catch (err) {
        res.status(500).send("Invalid user ID");
    }
});

// PATCH /user/:id – Update user by ID
app.patch('/user/:id', async (req, res) => {
    try {
        const updatedUser = await userModal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) return res.status(404).send("User not found");
        res.send(updatedUser);
    } catch (err) {
        res.status(500).send("Failed to update user");
    }
});

// DELETE /user/:id – Delete user by ID
app.delete('/user/:id', async (req, res) => {
    try {
        const deletedUser = await userModal.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).send("User not found");
        res.send(deletedUser);
    } catch (err) {
        res.status(500).send("Error deleting user");
    }
});


// --------------------------------------------------
// Start Server
// --------------------------------------------------

// Start the server and listen on port 4000
app.listen(4000);
