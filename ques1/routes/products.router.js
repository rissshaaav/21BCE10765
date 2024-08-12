const express = require('express');
const fetchProducts = require('../utils/fetchProducts.utils'); // Adjust the path as needed
const sortProducts = require('../utils/sortProducts.utils'); // Adjust the path as needed
const paginateProducts = require('../utils/paginateProducts.utils'); // Adjust the path as needed

// routes/getProducts.router.js
const router = express.Router();

router.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sort_by, order = 'asc', top=10, minPrice=1, maxPrice=1000 } = req.query;

    try {
        // Fetch data from e-commerce APIs
        const products = await fetchProducts(categoryname);

        // Sort and paginate products
        const sortedProducts = sortProducts(products, sort_by, order);
        const paginatedProducts = paginateProducts(sortedProducts, n, page);

        // Filter products based on optional parameters
        let filteredProducts = paginatedProducts;
        if (top) {
            filteredProducts = filteredProducts.slice(0, top);
        }
        if (minPrice) {
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
        }
        if (maxPrice) {
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        }

        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;