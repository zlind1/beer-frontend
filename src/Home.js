import React from 'react';
import { Redirect } from 'react-router-dom';
import { fetch } from './util';
import { UserContext } from './Context';

export default class Home extends React.Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.state = {redirect: '', user: null};
  }
  componentDidMount() {
    if (!this.context.tokenExists()) {
      this.logout();
    } else {
      fetch('/v0/user').then(res => {
        if (res.ok) {
          res.json().then(data => {
            const user = data[0]
            if (user !== undefined)
              this.setState({user: user})
          })
        } else {
          this.logout();
        }
      })
    }
  }
  logout = () => {
    fetch('/v0/logout', {method: 'POST'}).then(() => this.setState({redirect: '/'}));
  }
  render() {
    return this.state.redirect !== '' ? <Redirect to={this.state.redirect}/> : (
      <>
        {this.state.user !== null ? <div>Hi, {this.state.user.name}</div> : ''}
        <button onClick={this.logout}>Logout</button>
      </>
    );
  }
}
