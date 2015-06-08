'use strict';

var page = require('page');
var Promise = require('es6-promise').Promise;

class RouteStore {

	constructor() {

		// 重要：在 Store 內可透過 this.alt 取值
		this.ActionCreators = this.alt.getActions('ActionCreators');
		this.bindActions(this.ActionCreators);

		this.currentView = '----';

		// 我偏好一條條宣告要曝露的 method，而非用 state 標示
		// 並且注意這裏要放 bind，才能存取到 Store 與其身上的 props
		this.exportPublicMethods({
			todoReadAll: this.todoReadAll.bind(this, this.ActionCreators),
			todoReadOne: this.todoReadOne.bind(this, this.ActionCreators),
			getCurrentView: this.getCurrentView.bind(this)
		});

		// page() 是最重要的 routing 啟始指令，之後才會開始處理所有 routing rule
		// 並且只有在 browser 環境內才需要啟動以提供 client-side routing 服務
		// 重要：必需確保等到 Stores 已向 Dispatcher 註冊完後才能跑，不然所有 actions.XXX() 操作都沒意義
		if ('undefined' !== typeof window) {

			// 讀取 routing table 並註冊 routing rules
			var routines = require('../routing.js');

			// page('/', this.todoReadAll.bind(this, this.ActionCreators ) );
			// page('/:id', this.todoReadOne.bind(this, this.ActionCreators ) );

			routines.forEach((item) => {
				page(item.path, this[item.handler].bind(this, this.ActionCreators));
			})

			setTimeout(function() {
				// 真正啟動 router，注意它只負責 client-side routing
				page();
				console.log('Client Router 啟動了');
			}, 0)

		}

	}

	//
	todoReadAll(ac, ctx) {
		return ac.readAll()
			.then(function() {
				this.setState({
					currentView: 'master'
				})
			}.bind(this));

	}

	//
	todoReadOne(ac, ctx) {

		// console.log( '\n\n\ntodoReadOne: ', ac, '\n\n', ctx.params );
		// console.log( '\nreadOne \n', require('util').inspect( ac, false, 0, true) );
		var id = ctx.params.id;

		return ac.readOne(id)

		.then(
			function success() {
				this.setState({
					currentView: 'detail'
				})
			}.bind(this),

			function fail(err) {
				// console.log('\nRouteStore > 失敗: ', err);
				return Promise.reject(err);
			});

	}

	getCurrentView() {
		return this.currentView;
	}

}

module.exports = RouteStore;
