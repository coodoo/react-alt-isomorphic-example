'use strict';

require('es5-shim');
require('es5-shim/es5-sham');

var React = require('react');
var App = require('./components/App.jsx');

var Iso = require('iso');
var Flux = require('./flux');
var flux = new Flux();

// 這是 client app 負則將 server encode 好的資料還還並灌入 store 中
Iso.bootstrap(function (state, meta, container) {

	// console.log( '有跑 Iso.bootstrap():\n', state);

	flux.bootstrap(state);

	// 注意這裏將 flux instance 做為參數傳入 react app 內了
	React.render( React.createElement(App, {flux: flux}), container);
});

// 示範如果不需 isomorphic 時，此手法仍可當作一般 flux 來啟動程式
// flux.bootstrap(state);
// React.render( React.createElement(App, {flux: flux}), document.querySelector('#container') );
