import React from 'react';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct() {
    this.props.addToCart(this.props.id);
  }

  render() {
    return (
      <li>
        <div className="thumbnail">
          <img alt={this.props.name} src={this.props.image}/>
          <div className="caption clearfix">
            <h3><a href={this.props.url}>{this.props.name}</a></h3>
            <div className="product__price">
              <span>{this.props.price} </span>
              <span>{this.props.currency}</span>
            </div>
            <div className="product__button-wrap">
              <button
                className={this.props.isAddedToCart ? "btn btn-danger" : "btn btn-primary"}
                onClick={this.addProduct}
                >
                {this.props.isAddedToCart ? "Remove" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Product;
