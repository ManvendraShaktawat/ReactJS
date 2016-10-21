import React from "react";

class Product extends React.Component {
  constructor() {
    super();
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.removeFromCartHandler = this.removeFromCartHandler.bind(this);
  }
  addToCartHandler() {
    this.props.addToCart(this.props.id);
  }
  removeFromCartHandler() {
    this.props.removeFromCart(this.props.id);
  }
  render() {
    return (
      <li>
        <div className="thumbnail">
          <img alt={this.props.name} src={this.props.image}/>

          <div className="caption clearfix">
            <h3><a href=
            {this.props.url}>
            {this.props.name}</a></h3>

            <div className="product__price">
              <span>{this.props.price}</span>
              <span>{this.props.currency}</span>
            </div>

            <div className="product__button-wrap">
              <button className={this.props.isItemSelected?"btn btn-danger":"btn btn-primary"} onClick={this.props.isItemSelected?this.removeFromCartHandler:this.addToCartHandler}>{this.props.isItemSelected?"Remove":"Add to cart"}</button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Product;