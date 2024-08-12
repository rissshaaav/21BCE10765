// routes/productDetails.route.js
const express = require('express');
const router = express.Router();
const fetchProductDetails = require('../utils/fetchProductDetails.utils'); // Adjust the path as needed

router.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    try {
        // Fetch product details from cache or API
        const product = await fetchProductDetails(categoryname, productid);

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
});

module.exports = router;