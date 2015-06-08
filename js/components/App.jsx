'use strict';

var React = require('react');
var CartContainer = require('./CartContainer.jsx');
var ProductsContainer = require('./ProductsContainer.jsx');
var ProductsDetail = require('./ProductDetail.jsx');

//
var App = React.createClass({

    // root view 將 flux 物件設入 context 中
    // 所有 child component 即可存取
    childContextTypes: {
        flux: React.PropTypes.object.isRequired
    },

    getChildContext: function() {
        // console.log( '\n\n取 getChildContext() 時的 props: ', this.props );
        return {
            flux: this.props.flux || new Error('flux not found!')
        };
    },

    _getStateFromStores: function() {
        return {
            currentView: this.RouteStore.getCurrentView(),
            currentProduct: this.ProductStore.getCurrentProduct(),
            products: this.ProductStore.getProducts()
        }
    },


    getInitialState: function() {
        this.RouteStore = this.props.flux.getStore('RouteStore');
        this.ProductStore = this.props.flux.getStore('ProductStore');
        return this._getStateFromStores();
    },

    componentDidMount: function() {
        this.RouteStore.listen(this._onChange);
        this.ProductStore.listen(this._onChange);
    },

    componentWillUnmount: function() {
        this.RouteStore.unlisten(this._onChange);
        this.ProductStore.unlisten(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getStateFromStores());
    },

    render: function() {

        var view;

        if (this.state.currentView == 'master') {
            view = < ProductsContainer / > ;
        } else {
            view = < ProductsDetail
            product = {
                this.state.currentProduct
            }
            />;
        }

        return ( < div > {
                view
            } < CartContainer / >
            < /div>
        );
    }

});

module.exports = App;
