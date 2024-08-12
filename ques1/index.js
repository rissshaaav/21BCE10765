
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory cache
const cache = {};

// Step 3: Define Routes
const productsRouter = require('./routes/products.router');
const productDetailsRouter = require('./routes/productDetails.router');
app.use(productsRouter);
app.use(productDetailsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});