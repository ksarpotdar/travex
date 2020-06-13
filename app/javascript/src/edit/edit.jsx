import React from 'react'

import './edit.scss';

const ID = window.location.pathname.replace('/expenses/', '');

class Edit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editable: false,
      file: null,
      expenses: {},
      date: '',
      merchantFer: '',
      location: '',
      amount: 0,
      split: 1,
      category: '',
      payment_method: '',
      note: '',
      image_url:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
    this.handlePayment = this.handlePayment.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    fetch(`/api/expenses/${ID}`)
    .then(response => response.json())
    .then(data => this.setState({ expenses: data.expense }))
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  handleForm = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleCategory = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handlePayment = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleEdit = (event) => {
    event.preventDefault();
    this.setState({ editable: true})
   }

   handleUpdate = (event) => {
    event.preventDefault();
    const data = { 
      date: this.state.date,
      merchant: this.state.merchant,
      location: this.state.location,
      amount: this.state.amount,
      split: this.state.split,
      category: this.state.category,
      payment_method: this.state.payment_method,
      note: this.state.note,
    };

    fetch(`/api/expenses/${ID}`, ({
      method: 'PUT',
      body: JSON.stringify(data),
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data.success)
        if (data.success) {
          alert("Updated successfully!")
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  } 

  renderForm() {
    const { expenses } = this.state
    const { id, location, date, category, merchant, split, amount, payment_method, note, image_url } = expenses
    let merchant1 =  this.state.editable ? <input  name="merchantFer" className="input-form" type="text" value={this.state.merchantFer } ref={merchant} onChange={this.handleForm} /> : <p className="input-form">{merchant}</p> 
    console.log(this.state.editable)
      return(
        <form key={id}>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="label">Expense Date</label>
                  <input className="input-form" type="date" value={date} onChange={this.handleForm} />
                </div>
                <div className="form-group col-md-6">
                  <label className="label">Merchant</label>
                  {merchant1}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label className="label">Location</label>
                  <input className="input-form" type="text" value={location} onChange={this.handleForm} />
                </div>
                <div className="form-group col-md-5">
                  <label className="label">Amount</label>
                  <input className="input-form" type="number" min={0} step={0.01} value={amount} onChange={this.handleForm} />
                </div>
                <div className="form-group col-md-2">
                  <label className="label">Split</label>
                  <input className="input-form" type="number" min={1} value={split} onChange={this.handleForm} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label forhtml="categoryID">Category</label>
                  <select className="category-options" id="categoryID" value={category} onChange={this.handleCategory}>
                    <option disabled>Select...</option>
                    <option value="Air Travel">✈ Air Travel</option>
                    <option value="Lodging">🏨 Lodging</option>
                    <option value="Meals & Entertainment">🍽 Meals & Entertainment</option>
                    <option value="Phone & Internet">📲 Phone & Internet</option>
                    <option value="Transportation">🚖 Transportation</option>
                    <option value="Other Expense">🧾 Other Expense</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label forhtml="paymentID">Payment Method</label>
                  <select className="pay-options" id="paymentID" value={payment_method} onChange={this.handlePayment}>
                    <option disabled>Select...</option>
                    <option value="Cash">💵 Cash</option>
                    <option value="Credit Card">💳 Credit Card</option>
                    <option value="Other Payment Method">💰 Other Payment Method</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label forhtml="noteID">Note</label>
                <textarea className="text" id="noteID" rows="2" value={note} onChange={this.handleForm}></textarea>
              </div>
              <div className="text-center">
              <button className="btn btn-sm btn-success" onClick={this.handleEdit}>{this.state.editable? 'Submit' : 'Edit'}</button>
                <button className="button-form orange mr-5" type="submit">Edit</button>
                <button className="button-form green mr-5" type="submit">Save</button>
                <button onClick={()=> {window.location.href='/dashboard'}} className="button-form red" type="button">Cancel</button>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card mt-3 mb-3">
                <div className="card-body">
                  <h3>Receipt</h3>
                  <img className="responsive" src={image_url} />
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    } 

  render() {
    return (
    <div className="container">
      <div className="text-center mt-3">
        <h2 className="title mb-2">New Expense</h2>
      </div>
      
          {this.renderForm()}
        
      
    </div>
    )
  }

}

export default Edit