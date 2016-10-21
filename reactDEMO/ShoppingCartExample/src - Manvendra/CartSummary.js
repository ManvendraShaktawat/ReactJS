import React from "react";

class CartSummary extends React.Component {
  render() {
    var emptyCartSection = (
      <div className="alert alert-info">Cart is empty</div>
    );

    var total = this.props.cartItemsData.reduce((a, b) => {
      return a + b.price;
    }, 0);

    var cartItems = this.props.cartItemsData.map(cartItem => {
      return (
        <li key={cartItem.id} className="cart-item">
          <span className="cart-item__name">Citizen Men</span>
          <span className="cart-item__price">
            <span>{cartItem.price}</span>
            <span> </span>
            <span>{cartItem.currency}</span>
          </span>
        </li>
      );
    });

    var cartItemList = (
      <ul>
        {cartItems}
      </ul>
    );
    return (
      <div className="col-md-4">
        <h3>Shopping Cart</h3>

        <div className="cart">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.props.cartItemsData.length?cartItemList:emptyCartSection}
              <div className="cart__total">
                <span>Total:</span>&nbsp;
                <span className="cart__total__amount">{total}</span>&nbsp;
                <span>EUR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummary;