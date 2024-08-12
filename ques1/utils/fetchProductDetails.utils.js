// utils/fetchProductDetails.js
const axios = require('axios');
const cache = require('../cache');

async function fetchProductDetails(categoryname, productid) {
    // Check cache first
    const products = cache[categoryname];
    if (products) {
        const product = products.find(p => p.id === productid);
        if (product) return product;
    }

    // Fetch data from e-commerce APIs
    const apiUrls = [
        `https://api.ecommerce1.com/categories/${categoryname}/products/${productid}`,
        `https://api.ecommerce2.com/categories/${categoryname}/products/${productid}`,
        // Add more API URLs as needed
    ];

    const productPromises = apiUrls.map(url => axios.get(url));
    const responses = await Promise.all(productPromises);
    const product = responses.find(response => response.data.id === productid);

    return product ? product.data : null;
}

module.exports = fetchProductDetails;