'use strict';

var k = "ff";

var WebAPIUtils = require('../utils/WebAPIUtils');
var Promise = require('es6-promise').Promise;

class ActionCreators {

	constructor() {

		// 方便法門，自動生成三支 public action 供操作
		this.generateActions(
			'receiveProducts',
			'addToCart',
			'finishCheckout',
			'loadAllProducts',
			'loadOneProduct'
		);
	}

	//
	readAll(resolve) {

		var that = this;

		// 這樣 server 上才知道何時 data fetching 已完成，可以 react.renderToString() 了
		return WebAPIUtils

		.getAllProducts()

		.then(function success(arr) {
			// console.log( '\n ActionCreators 取回 products: ', arr );
			// action 取完資料後，必然是送入 Store 中保存，才能讓 view 更新
			// that.actions.loadAllProducts(arr);
			that.alt.getActions('ActionCreators').loadAllProducts(arr);
		})
	}

	//
	readOne(id) {

		// 返還 Promise 出去，
		// 這樣 server 上才知道何時 data fetching 已完成，可以 react.renderToString() 了
		return WebAPIUtils

		.getOneProduct(id)

		.then(product => {

			// action 取完資料後，必然是送入 Store 中保存，才能讓 view 更新
			this.alt.getActions('ActionCreators').loadOneProduct(product);

		})

	}

	// 這支沒辦法自動生成，因為多了操作 WebAPIUtil 指令
	cartCheckout(products) {
		var that = this;

		// 注意因此要自已 dispatch() 事件，這裏廣播的事件名稱就是 cartCheckout, 將來對應到 store 裏的 onCartCheckout handler
		this.dispatch(products);
		WebAPIUtils.checkoutProducts(products)
			.then(function(products) {
				// jxnote: 不能用 this.dispatch()，因為會 actionType 名稱會抓成 cartCheckout
				that.actions.finishCheckout(products);
			})
	}
}

module.exports = ActionCreators;
// alt.createActions(ActionsCreators, exports);
