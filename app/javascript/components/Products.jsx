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

  deleteProduct (productId) {
    if (confirm('Really delete this product?')) {
      axios.delete('/api/v1/products/' + productId, {
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content
        }
      })
        .then(() => {
          let products = this.state.products.filter(product => {
            return product.id !== productId
          });
          this.setState({ products: products });
        })
        .catch(error => console.log(error))
    }
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
                productId={product.id}
                partNumber={product.part_number}
                branchId={product.branch_id}
                partPrice={product.part_price}
                shortDesc={product.short_desc}
                deleteCall={this.deleteProduct.bind(this)}
              />)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Products
