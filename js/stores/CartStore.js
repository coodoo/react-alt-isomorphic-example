'use strict';

var assign = require('object-assign');

class CartStore {

  constructor() {

  	this.ActionCreators = this.alt.getActions('ActionCreators');
  	this.ProductStore = this.alt.getStore('ProductStore');

  	// console.log( '\n\nCartStore 拿到 ProductStore.token: ', this.ProductStore.dispatchToken );

    this.bindActions(this.ActionCreators);
    this.products = {};
  }

  onAddToCart(product) {

    // console.log( 'CartStore > onAddToCart 跑: ', this.ProductStore.dispatchToken );
    this.waitFor(this.ProductStore.dispatchToken);

    var id = product.id;
    product.quantity = id in this.products ? this.products[id].quantity + 1 : 1;
    this.products[id] = assign({}, product[id], product);
  }

  onCartCheckout() {
    this.products = {};
  }

  onFinishCheckout(products) {
    // this can be used to redirect to success page, etc.
    console.log('YOU BOUGHT:', products);
  }

  static getAddedProducts() {
    var { products } = this.getState();
    return Object.keys(products).map(function (id) {
      return products[id];
    });
  }

  static getTotal() {
    var total = 0;
    var { products } = this.getState();
    for (var id in products) {
      var product = products[id];
      total += product.price * product.quantity;
    }
    return total.toFixed(2);
  }
}

// module.exports = alt.createStore(CartStore, 'CartStore');
module.exports = CartStore;
