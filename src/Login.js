import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, FormGroup, TextField, Button } from '@material-ui/core';
import { hash, fetch } from './util';
import { UserContext } from './Context';

class Login extends React.Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.name = React.createRef();
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {
      newUser: false,
      redirect: '',
      nameError: false,
      usernameError: false,
      passwordError: false
    };
  }
  componentDidMount() {
    if (this.context.tokenExists()) {
      this.setState({redirect: '/home'});
    }
  }
  toggleNewUser = async () => {
    await this.setState({
      newUser: !this.state.newUser,
      nameError: false,
      usernameError: false,
      passwordError: false
    });
  }
  login = async (e) => {
    e.preventDefault();
    await this.setState({usernameError: false, passwordError: false});
    const user = {
      username: this.username.current.value,
      password: hash(this.password.current.value)
    };
    const errors = {
      usernameError: user.username === '',
      passwordError: this.password.current.value === ''
    };
    await this.setState(errors);
    if (errors.usernameError || errors.passwordError) return;
    const response = await fetch('/v0/login', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(user)
    });
    if (response.ok) {
      this.setState({redirect: '/home'});
    } else {
      if (response.status === 404) {
        this.setState({usernameError: true, passwordError: true});
      } else if (response.status === 500) {
        this.setState({passwordError: true});
      }
    }
  }
  signup = async (e) => {
    e.preventDefault();
    await this.setState({nameError: false, usernameError: false, passwordError: false});
    const user = {
      name: this.name.current.value,
      username: this.username.current.value,
      password: hash(this.password.current.value)
    };
    const errors = {
      nameError: user.name === '',
      usernameError: user.username === '',
      passwordError: this.password.current.value === ''
    };
    await this.setState(errors);
    if (errors.nameError || errors.usernameError || errors.passwordError) return;
    const response = await fetch('/v0/user', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(user)
    });
    if (response.ok) {
      this.setState({redirect: '/home'});
    } else {
      if (response.status === 500) {
        this.setState({usernameError: true});
      }
    }
  }
  render() {
    return this.state.redirect !== '' ? <Redirect to={this.state.redirect}/> : (
      <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <FormGroup>
            {this.state.newUser ? (
              <TextField
                label='name'
                error={this.state.nameError}
                inputRef={this.name}/>
              ) : ''}
            <TextField
              label='username'
              error={this.state.usernameError}
              inputRef={this.username}/>
            <TextField
              label='password'
              error={this.state.passwordError}
              type='password'
              inputRef={this.password}/>
            <Button
              color='primary'
              onClick={this.state.newUser ? this.signup : this.login}>
                Submit
            </Button>
            <Button onClick={this.toggleNewUser}>
              {this.state.newUser ? 'Login with existing account' : 'Create a new account'}
            </Button>
          </FormGroup>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
