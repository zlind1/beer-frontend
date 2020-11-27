import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import { LocalStorage } from './util';
import { UserContext } from './Context';

class App extends React.Component{
  setUser = (user) => {
    if (user === null) {
      LocalStorage.delete('user');
    } else {
      LocalStorage.set('user', user);
    }
    this.setState({user: user})
  }
  getUser = () => {
    if (this.state.user === null) {
      return LocalStorage.get('user');
    } else return this.state.user;
  }
  constructor() {
    super();
    this.state = {
      user: null,
      getUser: this.getUser,
      setUser: this.setUser
    };
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
        <BrowserRouter>
          <Route exact path='/'>
            <Login/>
          </Route>
          <Route exact path='/home'>
            <Home/>
          </Route>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
