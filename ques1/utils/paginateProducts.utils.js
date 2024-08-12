// utils/paginateProducts.js
function paginateProducts(products, n, page) {
    const startIndex = (page - 1) * n;
    const endIndex = startIndex + parseInt(n);
    return products.slice(startIndex, endIndex);
}

module.exports = paginateProducts;