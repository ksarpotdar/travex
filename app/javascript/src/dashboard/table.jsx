import React from "react";
import Message from "../report/message"

import './dashboard.scss';

class Table extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        expenses: [],
        user_id: ''
      }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => {this.setState({
        user_id: data.user_id })
        return fetch(`/api/${this.state.user_id}/expenses`)
        })
        .then(response => response.json())
        .then(data => this.setState({ expenses: data.expenses }))
  }

  renderTableData() {
    const data = this.state.expenses
    const size = 5
    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
    return sorted.slice(0, size).map((expense, index) => {
       const { id, location, date, category, amount, payment_method, status } = expense 
       return (
          <tr key={id}>
             <td>{date}</td>
             <td>{location}</td>
             <td><a href={`/expenses/${id}`}>{category}</a></td>
             <td className="amount">{amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
             <td>{payment_method}</td>
             <td>{status}</td>
          </tr>
       )
    })
 }

    render(){
      if(this.state.expenses.length > 0) {
        return(
          <table className="rtable rtable--flip table table-hover">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Category</th>
                <th scope="col">Amount</th>
                <th scope="col">Payment</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </table>
        )
      } 
      
      return (
        <React.Fragment>
          <Message message={"You don't have any recent expenses"} />
        </React.Fragment>
      )
        
    }

}

export default Table