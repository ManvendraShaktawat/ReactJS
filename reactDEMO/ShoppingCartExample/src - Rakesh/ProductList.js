import React from 'react';
import Product from './Product';

class ProductList extends React.Component {
  render() {
    var products = this.props.productList.map(product => {
      return (
        <Product
          key={product.id}
          addToCart={this.props.addToCart}
          {...product}
        />
      );
    });

    return (
      <div className="col-md-8">
        <h3>Products</h3>
        <div className="products-list">
          <ul className="clearfix">
            {products}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProductList;
