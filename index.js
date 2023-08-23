const express = require('express');
const app = express();
const PORT = 3000;

const users = {};

app.use(express.json());

app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (users[email]) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    users[email] = password;
    res.status(201).json({ message: 'User registered successfully.' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const storedPassword = users[email];
    if (!storedPassword || storedPassword !== password) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful.' });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;  // Export the server instance
