'use strict';

var React = require('react');
var ProductItem = require('./ProductItem.jsx');
var ProductsList = require('./ProductsList.jsx');
var ProductItemContainer = require('./ProductItemContainer.jsx');

class ProductsListContainer extends React.Component {

    constructor(props) {

        super(props);

        this._onChange = this._onChange.bind(this);
    }

    _getStateFromStores() {
        // 注意 getState() 是 alt 提供的方便指令
        return this.ProductStore.getState();
    }

    // 原本是在 getInitialState() 內做，但改成 es6 class 後無此指令
    // 因此移到下一個 life cycle method 也就是 componentWillMount() 來做
    componentWillMount() {

        this.flux = this.context.flux;
        this.ActionCreators = this.flux.getActions('ActionCreators');
        this.ProductStore = this.flux.getStore('ProductStore');

        this.state = this._getStateFromStores();
    }

    componentDidMount() {
        this.ProductStore.listen(this._onChange);
    }

    componentWillUnmount() {
        this.ProductStore.unlisten(this._onChange);
    }

    render() {
      var nodes = this.state.products.map(function (product) {
        return <ProductItemContainer key={product.id} product={product} />;
      });

      return (
        <ProductsList title="Flux Shop Demo (Alt)">
          {nodes}
        </ProductsList>
      );
    }



    _onChange() {
        this.setState(this._getStateFromStores());
    }

};

ProductsListContainer.contextTypes = {
    flux: React.PropTypes.object.isRequired
}

module.exports = ProductsListContainer;

/*
// 將原本 createClass() 語法改成 ES6，示範 class 語法
var ProductsListContainer = React.createClass({

		// jxiso: 宣告取得 flux
		contextTypes: {
	      flux: React.PropTypes.object.isRequired
	  },

  getInitialState: function () {
	  	// console.log( '\n\n來喔 initialState: ', this.context );
	  	flux = this.context.flux;
	  	ActionCreators = flux.getActions('ActionCreators');
	  	ProductStore = flux.getStore('ProductStore');
	  	console.log( 'ProductContainer 取回的 ProductStore =  ', ProductStore );
    return _getStateFromStores();
  },

  componentDidMount: function () {
    ProductStore.listen(this._onChange);
  },

  componentWillUnmount: function () {
    ProductStore.unlisten(this._onChange);
  },

  render: function () {
    var nodes = this.state.products.map(function (product) {
      return <ProductItemContainer key={product.id} product={product} />;
    });

    return (
      <ProductsList title="Flux Shop Demo (Alt)">
        {nodes}
      </ProductsList>
    );
  },

  _onChange: function () {
    this.setState(_getStateFromStores());
  }
});
*/
