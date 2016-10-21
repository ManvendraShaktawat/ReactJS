import React from "react";

import productListData from "./data/products"

import SearchBox from "./SearchBox";
import ProductList from "./ProductList";
import CartSummary from "./CartSummary";

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      productListData,
      cartItemsData: [],
      searchText: ""
    }
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.search = this.search.bind(this);
  }

  addToCart(id) {
    var productListData = this.state.productListData.slice(0).map(product => Object.assign({}, product));
    var cartItemsData = this.state.cartItemsData.slice(0).map(item => Object.assign({}, item));

    var newCartItem = productListData.filter(product => product.id===id);

    newCartItem[0].isItemSelected = true;

    cartItemsData.push(newCartItem[0]);

    this.setState({
      productListData,
      cartItemsData
    });
  }

  removeFromCart(id) {
    var productListData = this.state.productListData.slice(0).map(product => Object.assign({}, product));
    var cartItemsData = this.state.cartItemsData.slice(0).map(item => Object.assign({}, item));

    var newCartItem = productListData.filter(product => product.id===id);

    for(var index=0;index<cartItemsData.length;index++) {
      if(cartItemsData[index].id === id) {
        break;
      }
    }

    if(index!==productListData.length) {
      cartItemsData.splice(index, 1);
      newCartItem[0].isItemSelected = false;

      this.setState({
        productListData,
        cartItemsData
      });
    }
  }

  search(searchText) {
    var productListData = this.state.productListData.slice(0).map(product => Object.assign({}, product));

    this.setState({
      productListData,
      searchText
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>{this.props.header}</h1>
          </div>
        </div>

        <SearchBox 
          search={this.;} 
        />

        <div className="row">
          <ProductList 
            productListData={this.state.productListData}
            searchText={this.state.searchText}
            addToCart = {this.addToCart}
            removeFromCart = {this.removeFromCart}
          />
          <CartSummary 
            cartItemsData={this.state.cartItemsData}
          />
        </div>
      </div>
    );
  }
}

export default ShoppingCart;