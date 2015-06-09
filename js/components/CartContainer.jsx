'use strict';

var React = require( 'react' );
var Cart = require( './Cart.jsx' );

function foo () {
	console.log( 'dd' );
}

var CartContainer = React.createClass( {

	// jxiso: 宣告取得 flux
	contextTypes: {
		flux: React.PropTypes.object.isRequired
	},

	_getStateFromStores: function(){
		return {
			products: this.CartStore.getAddedProducts(),
			total: this.CartStore.getTotal()
		};
	},

	getInitialState: function(){
		this.flux = this.context.flux;
		this.ActionCreators = this.flux.getActions( 'ActionCreators' );
		this.CartStore = this.flux.getStore( 'CartStore' );
		return this._getStateFromStores();
	},

	componentDidMount: function(){
		this.CartStore.listen( this._onChange );
	},

	componentWillUnmount: function() {
		this.CartStore.unlisten( this._onChange );
	},

	onCheckoutClicked: function() {
		if ( !this.state.products.length ) {
			return;
		}

		this.ActionCreators.cartCheckout( this.state.products );
	},

	render: function() {
		return ( <Cart products= {this.state.products}
		total= {this.state.total}
		onCheckoutClicked= {this.onCheckoutClicked}
		/> );
	},

	_onChange: function() {
		this.setState( this._getStateFromStores() );
	}
} );

module.exports = CartContainer;
