const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/student');

// Student Marks Schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_marks: Number
});

const StudentMark = mongoose.model('studentmarks', studentSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// Insert sample data (Task c)
app.get('/insert-sample', async (req, res) => {
    const sampleData = [
        {
            Name: 'ABC',
            Roll_No: 111,
            WAD_Marks: 25,
            CC_Marks: 25,
            DSBDA_Marks: 25,
            CNS_Marks: 25,
            AI_marks: 25
        },
        // Add more sample documents as needed
    ];

    try {
        await StudentMark.insertMany(sampleData);
        res.send('Sample data inserted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Display count and documents (Task d)
app.get('/display', async (req, res) => {
    try {
        const count = await StudentMark.countDocuments();
        const students = await StudentMark.find();
        res.send(`Total documents: ${count}<br>${JSON.stringify(students)}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Students with DSBDA >20 (Task e)
app.get('/dsbda-above20', async (req, res) => {
    try {
        const students = await StudentMark.find({ DSBDA_Marks: { $gt: 20 } }, 'Name');
        const names = students.map(s => s.Name).join('<br>');
        res.send(`Students with DSBDA >20: <br>${names}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update marks by 10 (Task f)
app.get('/update-marks', async (req, res) => {
    const { rollNo } = req.query;
    try {
        await StudentMark.updateOne(
            { Roll_No: rollNo },
            { $inc: { 
                WAD_Marks: 10,
                CC_Marks: 10,
                DSBDA_Marks: 10,
                CNS_Marks: 10,
                AI_marks: 10 
            }}
        );
        res.send('Marks updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Students with all subjects >25 (Task g)
app.get('/all-above25', async (req, res) => {
    try {
        const students = await StudentMark.find({
            WAD_Marks: { $gt: 25 },
            CC_Marks: { $gt: 25 },
            DSBDA_Marks: { $gt: 25 },
            CNS_Marks: { $gt: 25 },
            AI_marks: { $gt: 25 }
        }, 'Name');
        const names = students.map(s => s.Name).join('<br>');
        res.send(`Students with all subjects >25: <br>${names}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Students with low marks in two subjects (Task h)
app.get('/low-marks', async (req, res) => {
    try {
        const students = await StudentMark.find({
            WAD_Marks: { $lt: 40 },
            CC_Marks: { $lt: 40 }
        }, 'Name');
        const names = students.map(s => s.Name).join('<br>');
        res.send(`Students with low marks: <br>${names}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Remove student (Task i)
app.get('/remove-student', async (req, res) => {
    const { rollNo } = req.query;
    try {
        await StudentMark.deleteOne({ Roll_No: rollNo });
        res.send('Student removed successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Display data in table format (Task j)
app.get('/table', async (req, res) => {
    try {
        const students = await StudentMark.find();
        let html = `
            <table border="1">
                <tr>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>WAD</th>
                    <th>DSBDA</th>
                    <th>CNS</th>
                    <th>CC</th>
                    <th>AI</th>
                </tr>
        `;
        
        students.forEach(student => {
            html += `
                <tr>
                    <td>${student.Name}</td>
                    <td>${student.Roll_No}</td>
                    <td>${student.WAD_Marks}</td>
                    <td>${student.DSBDA_Marks}</td>
                    <td>${student.CNS_Marks}</td>
                    <td>${student.CC_Marks}</td>
                    <td>${student.AI_marks}</td>
                </tr>
            `;
        });
        
        html += '</table>';
        res.send(html);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));