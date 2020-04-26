import React, { useState } from 'react';
import TodoList from './TodoList.js';
import { Button, TextField } from '@material-ui/core';

const Login = () => {
  
  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#808080',
    margin: '15px 0'
  }

  // set initial state to clear out form if login is unsucessful
  const initialState = {
    email: '',
    password: ''
  }  

  const [loginState, setLoginState] = useState(initialState); 
  
  // state tracks when login is successful to run TodoList component
  const [loginSuccess, setLoginSuccess] = useState(false);

  
  const handleChange = (evt) => setLoginState({
    ...loginState,
    [evt.target.name]: evt.target.value
    }
  );
 
  // sends and receive data from login route to validate user login
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(loginState);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginState)
      })
    .then(res => {
        if (!(res.ok)) {
          alert('Incorrect login or password.');
          // param needs to be iterable 
          setLoginState({...initialState})
        }
        else {
          setLoginSuccess(true); 
        }  
    });  
  };

  if (loginSuccess === true) {
    return <TodoList />
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField 
          required id="standard-required" 
          label="Email" 
          name="email"
          value={loginState.email}
          onChange={handleChange}
          style={{margin: '0 5px 0 0'}}
        />
        <TextField
          required id="standard-password-input"
          label="Password"
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
          style={{margin: '0 0 0 5px'}}
        />
      </div>
      <Button 
        variant="contained" 
        style={buttonStyle} 
        type="submit">
          Login
      </Button>
    </form>
  )
};

export default Login;