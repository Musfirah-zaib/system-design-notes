// server.js
require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// Routes ko connect karna
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend Application running on port ${PORT} 🔥`);
});
