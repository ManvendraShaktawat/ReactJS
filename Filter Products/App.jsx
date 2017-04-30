import React from 'react';

class FilterBlock extends React.Component {
  render() {
    return(
      <div>
        <input type="text" value={this.props.searchText} onChange={this.props.handleChange} />
        <br/><br/>
        <input type="checkbox" checked={this.props.inStock} onChange={this.props.handleInStockCheckbox} />
        {' '}
        Only Show products in Stock
      </div>
    );
  }
}

class FilteredList extends React.Component {
  render() {
    var _self = this;

    let list = _self.props.products.map(function(product) {
      let listItem;
      if(_self.props.inStock && !product.stocked) {
        return null;
      } else if(!product.name.toLowerCase().includes(_self.props.searchText.toLowerCase())) {
        return null;
      }
      return (
        <tr key={product.name}>
          <td>{product.name}</td>
          <td>{product.price}</td>
        </tr>
      );
    })
    return(
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      inStock: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleInStockCheckbox = this.handleInStockCheckbox.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleInStockCheckbox() {
    this.setState({
      inStock: !this.state.inStock
    });
  }

  render() {
    return(
      <fieldset>
        <legend> FILTER PRODUCTS </legend>
        <FilterBlock searchText={this.state.searchText}
          inStock={this.state.inStock}
          handleChange={this.handleChange}
          handleInStockCheckbox={this.handleInStockCheckbox} 
        />
        <br/>
        <FilteredList products={PRODUCTS}
          searchText={this.state.searchText}
          inStock={this.state.inStock}
        />
      </fieldset>
    );
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

export default FilterableProductTable;