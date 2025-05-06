const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Start server
app.listen(3001)