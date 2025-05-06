const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// API endpoint to get employee data
app.get('/api/employees', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'employees.json'));
    const employees = JSON.parse(data);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error reading employee data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});