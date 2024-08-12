const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// importing routers

// Router for handling products.
const productsRouter = require('./routes/products.router');
// Router for handling product details.
const productDetailsRouter = require('./routes/productDetails.router');

app.use("http://20.244.56.144/test/", productsRouter);
app.use("http://20.244.56.144/test/", productDetailsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listening to the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});