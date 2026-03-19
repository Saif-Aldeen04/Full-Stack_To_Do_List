// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/User");

// Create Express application
const app = express();

// Set up EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the 'public' directory
app.use(express.static("public"));
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Set up session middleware
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
}));

// MongoDB connection string (password encoded)
const password = encodeURIComponent("uC#M5LZ@3#Ln@6i");
mongoose.connect(`mongodb+srv://seafeldeenwael_db_user:${password}@cluster0.oc7y3y0.mongodb.net/?appName=Cluster0`)
.then(() => console.log("Connected Successfully."))
.catch(e => console.log(e));

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) return next();
    res.redirect("/login");
}

// Route handlers for pages
// GET /login - Render login page if not logged in, else redirect to home
app.get("/login", (req, res) => {
    if (req.session.user) return res.redirect("/home");
    res.render("login");
});

// GET /sign_up - Render signup page if not logged in, else redirect to home
app.get("/sign_up", (req, res) => {
    if (req.session.user) return res.redirect("/home");
    res.render("signup");
});

// GET /home - Render home page with user's tasks (requires authentication)
app.get("/home", isAuthenticated, async (req, res) => {
    const user = await User.findById(req.session.user._id);
    res.render("home", { username: user.username, tasks: user.tasks });
});

// GET /logout - Destroy session and redirect to login
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

// API route handlers
// POST /sign_up - Handle user registration
app.post("/sign_up", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.json({ success: false, message: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();
    req.session.user = newUser;
    res.json({ success: true, message: "User created" });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    req.session.user = user;
    res.json({ success: true, message: "Login successful" });
});

app.post("/add-task", isAuthenticated, async (req, res) => {
    const { task } = req.body;
    if (!task) return res.json({ success: false, message: "Task required" });

    const user = await User.findById(req.session.user._id);
    user.tasks.push(task);
    await user.save();
    res.json({ success: true });
});

app.post("/remove-task", isAuthenticated, async (req, res) => {
    const { index } = req.body;
    const user = await User.findById(req.session.user._id);
    if (index >= 0 && index < user.tasks.length) {
        user.tasks.splice(index, 1);
        await user.save();
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid index" });
    }
});

// Catch-all 404 handler (must come after all other routes)
app.use((req, res) => {
    res.status(404).render("404", { path: req.originalUrl });
});

app.listen(10000, () => console.log("Server running on http://localhost:10000/home"));