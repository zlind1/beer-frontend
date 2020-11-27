import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './Context';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {redirect: ''};
  }
  logout = () => {
    this.setUser(null);
    this.setState({redirect: '/'});
  }
  render() {
    return this.state.redirect !== '' ? <Redirect to={this.state.redirect}/> : (
      <UserContext.Consumer>
        {ctx => {
          this.setUser = ctx.setUser;
          const user = ctx.getUser();
          if (user === null) {
            this.setState({redirect: '/'});
            return '';
          }
          return <>
            <div>Hi, {user.name}</div>
            <button onClick={this.logout}>Logout</button>
          </>
        }}
      </UserContext.Consumer>
    );
  }
}
