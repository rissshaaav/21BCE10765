// utils/fetchProducts.js
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const cache = {}; // Ensure cache is defined or imported

async function fetchProducts(categoryname) {
    // Check cache first
    if (cache[categoryname]) {
        return cache[categoryname];
    }

    // Fetch data from e-commerce APIs
    const apiUrls = [
        `https://api.ecommerce1.com/categories/${categoryname}/products`,
        `https://api.ecommerce2.com/categories/${categoryname}/products`,
        // Add more API URLs as needed
    ];

    const productPromises = apiUrls.map(url => axios.get(url));
    const responses = await Promise.all(productPromises);
    const products = responses.flatMap(response => response.data);

    // Generate unique identifiers for products
    products.forEach(product => {
        product.id = uuidv4();
    });

    // Cache the results
    cache[categoryname] = products;

    return products;
}

module.exports = fetchProducts;