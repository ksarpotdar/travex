import React from "react";
import Layout from "./layout";
import Stats from "./stats";
import Table from "./table";
import Form from "../form/form";
import Receipts from "../receipts/receipts"

import './dashboard.scss';

const RenderHome = ({onClick}) => {
  return (
    <React.Fragment>  
    <div className="container">
      <div className="text-center mt-3">
        <h2 className="title mb-3">Dashboard</h2>
      </div>
      <div className="row">
        <div className="col-sm-6 text-center mt-3">
          <div className="card card-dashboard">
            <div className="card-body card-link" onClick={() => {window.location.href='/form'}}>
              <a href="/form" id="expense-link" className="link">
                <svg className="bi bi-plus-circle icon" width="4em" height="4em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                  <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                </svg>
                <h3 className="mt-2 icon-name">Add Expense</h3>
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 text-center mt-3">
          <div className="card card-dashboard">
            <div className="card-body card-link" onClick={onClick}>
              <a className="link"  id="expense-link">
                <svg className="bi bi-layout-text-window-reverse mr-3 icon" width="4em" height="4em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2 1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm12-1a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M5 15V4H4v11h1zM.5 4h15V3H.5v1zM13 6.5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5z"
                    clipRule="evenodd" />
                </svg>
                <h3 className="mt-2 icon-name">See Receipts</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="summary-section">
        <Stats />
      </div>
      <div className="card card-summary mt-5">
        <div className="card-header">Recent Expenses</div>
        <div className="table-responsive p-2">
          <Table />
        </div>
      </div>
    </div>
  </React.Fragment>
  )
}

class Standard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      renderComp:'',
    }
  }

  handleClick(compName){
    this.setState({renderComp:compName});
  }
  _renderSubCompFer(){
    switch(this.state.renderComp){
      case 'form': return <Form />
      case 'receipts': return <Receipts />
      default: return <RenderHome onClick={this.handleClick.bind(this, 'receipts')}/>
    }
  }

  render() {

    return (
      <Layout>
      {this._renderSubCompFer()}
      </Layout>
    )
  }

}

export default Standard
