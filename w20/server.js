// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employees")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
    joiningDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

// Middleware
app.use(express.json());

// Routes
// Add new employee
app.post('/api/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.send(employees);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

// Update employee details
app.put('/api/employees/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'department', 'designation', 'salary', 'joiningDate'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }

        res.send(employee);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete employee
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }

        res.send({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});