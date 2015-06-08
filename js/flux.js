
var Alt = require('alt');

export default class Flux extends Alt {

  constructor() {

    super()

    // actionCreators 一定要最優先宣告，因為下面的 stores 可能會引用它
    this.addActions('ActionCreators', require('./actions/ActionCreators'))

    this.addStore('ProductStore', require('./stores/ProductStore') );
    this.addStore('CartStore', require('./stores/CartStore') );
    this.addStore('RouteStore', require('./stores/RouteStore') );

  }
}
