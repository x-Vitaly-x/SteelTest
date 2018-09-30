import React from 'react'
import axios from 'axios'
import ProductForm from './ProductForm.jsx'
import ProductField from './ProductField.jsx'

class Products extends React.Component {
  state = {
    products: []
  };

  componentDidMount () {
    this.fetchProducts();
  }

  fetchProducts () {
    axios.get('/api/v1/products')
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => console.log(error))
  }

  render () {
    return (
      <div>
        <ProductForm success={this.fetchProducts.bind(this)}/>
        <table className='table'>
          <thead>
            <tr>
              <td>PART_NUMBER</td>
              <td>BRANCH_ID</td>
              <td>PART_PRICE</td>
              <td>SHORT_DESC</td>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, index) => {
              return (<ProductField
                key={product.id}
                partNumber={product.part_number}
                branchId={product.branch_id}
                partPrice={product.part_price}
                shortDesc={product.short_desc}
              />)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Products
