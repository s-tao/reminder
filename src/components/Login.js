import React, { useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Grid, Button, TextField } from '@material-ui/core';
import BackLink from './BackLink.js';

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
          // param needs to be iterable + clears out form  
          setLoginState({...initialState})
        }
        else {
          setLoginSuccess(true); 
        }  
    });  
  };

// remove history b/c it renders twice 
//   const history = useHistory();

//   if (loginSuccess === true) {
//     // return <TodoList />
//     history.push('/todo-list')
//     console.log('Successfully logged in')
//   }

     if (loginSuccess === true) {
       return ( 
         <Switch>
           <Redirect to={'/todo-list'}/>
         </Switch>)
     }    

  return (
    <Grid>
      <BackLink selectedLink={'/'} />
      <Grid>
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
              Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  )
};

export default Login;

