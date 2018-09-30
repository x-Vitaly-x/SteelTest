import React from 'react'

class ProductField extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <tr>
        <td>{this.props.partNumber}</td>
        <td>{this.props.branchId}</td>
        <td>{this.props.partPrice}</td>
        <td>{this.props.shortDesc}</td>
        <td><a onClick={() => this.props.deleteCall(this.props.productId)} className='btn btn-danger'>Delete</a></td>
      </tr>
    );
  }
}

export default ProductField
