// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// In-memory user store and progress tracker
const users = {};
const userProgress = {};

// Set up multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadDir = 'uploads/';
            if (!fs.existsSync(uploadDir)){
                fs.mkdirSync(uploadDir);
            }
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            const fileExtension = path.extname(file.originalname);
            const fileName = `${Date.now()}${fileExtension}`;
            cb(null, fileName);
        }
    })
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Sign Up Endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    users[username] = { password, progress: {} };
    res.json({ message: 'Sign Up successful!' });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!users[username] || users[username].password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful!' });
});

// Profile Upload Endpoint
app.post('/upload', upload.single('profilePic'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const username = req.body.username; // Ensure to get username from the request
    if (users[username]) {
        users[username].profilePic = req.file.filename;
    }
    res.json({ message: 'File uploaded successfully!', fileName: req.file.filename });
});

// Save Progress Endpoint
app.post('/save-progress', (req, res) => {
    const { username, progress } = req.body;
    if (users[username]) {
        users[username].progress = progress;
        res.json({ message: 'Progress saved successfully!' });
    } else {
        res.status(400).json({ message: 'User not found' });
    }
});

// Retrieve Progress Endpoint
app.get('/get-progress/:username', (req, res) => {
    const username = req.params.username;
    if (users[username]) {
        res.json(users[username].progress);
    } else {
        res.status(400).json({ message: 'User not found' });
    }
});

// Serve static files from 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Sample in-memory database
const users = {}; // Use a real database in production

// Sign Up Route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users[username] = { password };
    res.status(200).json({ message: 'Sign up successful' });
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful' });
});

// Update Progress Route
app.post('/update-progress', (req, res) => {
    const { username, page } = req.body;
    // Here you would update the user progress in your database
    res.status(200).json({ message: 'Progress updated' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
