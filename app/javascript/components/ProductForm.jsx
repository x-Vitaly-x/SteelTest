import React from 'react'
import axios, { post } from 'axios';

class ProductForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      file: null,
      checkboxChecked: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit (e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(() => {
      alert('New data successfully uploaded.');
      this.props.success();
    }, error => {
      alert('Could not upload new data, check the integrity of your CSV.');
      console.log(error);
    })
  }

  onChange (e) {
    this.setState({ file: e.target.files[0] })
  }

  fileUpload (file) {
    const url = '/api/v1/products/csv_uploads';
    const formData = new FormData();
    formData.append('csv_upload', file);
    formData.append('delete_old_entries', this.state.checkboxChecked + 0); // convert boolean to integer
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content
      }
    };
    return post(url, formData, config)
  }

  getDisabledStatus () {
    if (this.state.file === null) {
      return 'disabled'
    } else {
      return ''
    }
  }

  getChecked () {
    if (this.state.checkboxChecked) {
      return 'checked'
    } else {
      return ''
    }
  }

  changeCheckbox () {
    this.setState({
      checkboxChecked: !this.state.checkboxChecked
    })
  }

  render () {
    return (
      <div className='menu mb-2'>
        <form onSubmit={this.onFormSubmit}>
          <input type="file" onChange={this.onChange} accept='text/csv'/>
          <label className='mr-3'>Delete old entries?</label>
          <input type='checkbox' className='mr-4'
                 checked={this.getChecked()}
                 onChange={() => this.changeCheckbox()}/>
          <button type="submit" className='btn btn-info'
                  disabled={this.getDisabledStatus()}>Upload CSV
          </button>
        </form>
      </div>
    );
  }
}

export default ProductForm
