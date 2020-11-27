import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './Context';

export default class Home extends React.Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.state = {redirect: ''};
  }
  componentDidMount() {
    if (this.context.getUser() === null) {
      this.setState({redirect: '/'})
    }
  }
  logout = () => {
    this.context.setUser(null);
    this.setState({redirect: '/'});
  }
  render() {
    return this.state.redirect !== '' ? <Redirect to={this.state.redirect}/> : (
      <>
        <div>Hi, {this.context.user.name}</div>
        <button onClick={this.logout}>Logout</button>
      </>
    );
  }
}
