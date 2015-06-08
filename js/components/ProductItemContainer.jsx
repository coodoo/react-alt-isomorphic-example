'use strict';

var React = require('react');
var ProductItem = require('./ProductItem.jsx');

var ProductItemContainer = React.createClass({

	contextTypes: {
	      flux: React.PropTypes.object.isRequired
	  },

	onAddToCartClicked: function () {
		this.ActionCreators.addToCart(this.props.product);
	},

	getInitialState: function () {
	  	this.flux = this.context.flux;
	  	this.ActionCreators = this.flux.getActions('ActionCreators');
		return {};
	},

	render: function () {
		return (
			<ProductItem product={this.props.product} onAddToCartClicked={this.onAddToCartClicked} />
		);
	}
});

module.exports = ProductItemContainer;
