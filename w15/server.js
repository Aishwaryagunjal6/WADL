const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// API endpoint to get products
app.get('/api/products', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'products.json'));
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error reading product data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});