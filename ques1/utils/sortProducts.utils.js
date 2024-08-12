// utils/sortProducts.js
function sortProducts(products, sortBy, order) {
    if (!sortBy) return products;

    return products.sort((a, b) => {
        if (order === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });
}

module.exports = sortProducts;