import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import { Cookie } from './util';
import { UserContext } from './Context';

class App extends React.Component{
  tokenExists = () => {
    return Cookie.exists('validToken');
  }
  constructor() {
    super();
    this.state = {
      tokenExists: this.tokenExists
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
