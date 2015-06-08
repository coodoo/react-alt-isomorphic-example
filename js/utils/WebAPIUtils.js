'use strict';

var shop = require('../api/shop');
var Promise = require('es6-promise').Promise;

module.exports = {

    getAllProducts: function() {
        return shop.getProducts();
    },

    getOneProduct: function(id) {
        return shop.getOneProduct(id);
    },

    checkoutProducts: function(products) {
        return shop.buyProducts(products);
    }
};
