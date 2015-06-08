'use strict';

class ProductStore {

  constructor() {

  	this.ActionCreators = this.alt.getActions('ActionCreators');

    this.bindActions(this.ActionCreators);

    this.products = [];
    this.currentProduct = null;

    this.exportPublicMethods({
      getCurrentProduct: this.getCurrentProduct.bind(this),
      getProducts: this.getProducts.bind(this)
    });
  }

  decreaseInventory(product) {
    product.inventory = product.inventory > 0 ? product.inventory-1 : 0;
  }

  onLoadAllProducts(arr){
    // console.log( '\nProducStore.onLoadAllProducts = ' , arr);
    this.products = arr;
  }

  onLoadOneProduct(product){
    // console.log( '\nProducStore.onLoadOneProduct 跑完' , product );
    // this.currentProduct = product;
    this.setState({currentProduct: product});
  }

  onAddToCart(product) {
    this.decreaseInventory(product);
    this.emitChange();
  }

  onReceiveProducts(products) {
    // this.products = products;
    this.setState({products: products});
  }


  getCurrentProduct() {
  	return this.currentProduct;
  }

  getProducts() {
  	return this.products;
  }
}

// module.exports = alt.createStore(ProductStore, 'ProductStore');
module.exports = ProductStore;
