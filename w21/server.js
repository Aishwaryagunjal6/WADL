// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    genre: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

// Middleware
app.use(express.json());

// Routes
// Add a new book
app.post('/api/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.send(books);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

// Update book details
app.put('/api/books/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'author', 'price', 'genre'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }

        res.send(book);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }

        res.send({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});