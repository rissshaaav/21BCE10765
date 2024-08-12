// routes/getProducts.router.js
const express = require('express');
const router = express.Router();
const fetchProducts = require('../utils/fetchProducts.utils'); // Adjust the path as needed
const sortProducts = require('../utils/sortProducts.utils'); // Adjust the path as needed
const paginateProducts = require('../utils/paginateProducts.utils'); // Adjust the path as needed

router.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sort_by, order = 'asc' } = req.query;

    try {
        // Fetch data from e-commerce APIs
        const products = await fetchProducts(categoryname);

        // Sort and paginate products
        const sortedProducts = sortProducts(products, sort_by, order);
        const paginatedProducts = paginateProducts(sortedProducts, n, page);

        res.json(paginatedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;