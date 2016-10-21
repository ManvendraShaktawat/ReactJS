import React from 'react';

class CartSummary extends React.Component {
  render() {
    var total = this.props.cartItems.reduce((a, b) => {
      return a + b.price;
    }, 0);

    var items = this.props.cartItems.map(item => {
      return (
        <li key={item.id} className="cart-item">
          <span className="cart-item__name">{item.name}</span>
          <span className="cart-item__price">
            <span>{item.price}</span>
            <span> </span>
            <span>{item.currency}</span>
          </span>
        </li>
      );
    });

    var emptyBlock = (
      <div className="alert alert-info">Cart is empty</div>
    );

    var itemsList = (
      <ul>
        {items}
      </ul>
    );

    return (
      <div className="col-md-4">
        <h3>Shopping Cart</h3>
        <div className="cart">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.props.cartItems.length ? itemsList : emptyBlock}
              <div className="cart__total">
                <span>Total:</span>&nbsp;
                <span className="cart__total__amount">
                  {total}</span>&nbsp;
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
