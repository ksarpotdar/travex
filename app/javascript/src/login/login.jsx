// login.jsx
import React from 'react';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './login.scss';

class Login extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    })
  }

  render() {
    const { authenticated, show_login } = this.state;
    if (authenticated) {
      return (
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4 login-card">
                  <p className="mb-0">You are already logged in 🙂</p>
                    <a className="nav-link" href="/dashboards">Home</a>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    };
    
    return (
      <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1" id="brand">travex</span>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div>
              <h2 className="mt-5 title">This is a title</h2>
            </div>
            <div>
              <p className="mt-3 content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim blandit volutpat maecenas volutpat. Est ultricies integer quis auctor elit sed vulputate mi sit. Ac turpis egestas maecenas pharetra. Nisi est sit amet facilisis magna etiam. Eleifend mi in nulla posuere sollicitudin. Elementum sagittis vitae et leo duis ut diam. Velit aliquet sagittis id consectetur purus ut faucibus. Odio euismod lacinia at quis risus. Odio eu feugiat pretium nibh ipsum consequat nisl.
              </p>
            </div>
          </div>
          {show_login ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default Login;
