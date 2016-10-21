import React from "react";

import Product from "./Product";

class ProductList extends React.Component {
  render() {
    var productList = this.props.productListData.map(product => {
      if(product.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1) {
        return (
          <Product
            key = {product.id}
            addToCart = {this.props.addToCart}
            removeFromCart = {this.props.removeFromCart}
            {...product}
          />
        );
      }
    });
    return (
      <div className="col-md-8">
        <h3>Products</h3>

        <div className="products-list">
          <ul className="clearfix">
            {productList}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProductList;