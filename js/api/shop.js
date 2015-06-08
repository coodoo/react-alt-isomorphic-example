/**
* Mocking client-server processing
*/
'use strict';

var Shop = exports;

var _products = require('./products.json');

var TIMEOUT = 100;

Shop.getProducts = function (timeout) {
  timeout = timeout || TIMEOUT;
  return new Promise( (resolve, reject) => {
	  setTimeout(function () {
	    resolve(_products);
	  }, timeout);

  })
};

Shop.getOneProduct = function (id, timeout) {

  timeout = timeout || TIMEOUT;

  return new Promise( (resolve, reject) => {

	  setTimeout(function () {

	  	for(let item of _products ){
	  		if( item.id == id ){
	  			resolve(item);
	  		}
	  	}

	  	// 如果走到這一行，代表前面找不到需要的商品，自然就拋錯了
	  	// console.log( 'shop > 失敗' );
	  	reject( 'Product not found' );

	  }, timeout);

  })
};

Shop.buyProducts = function (payload, timeout) {
  timeout = timeout || TIMEOUT;

  return new Promise( (resolve, reject) => {
	  setTimeout(function () {
	    resolve(payload);
	  }, timeout);

  })
};
