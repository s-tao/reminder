import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, TextField } from '@material-ui/core';
import BackLink from './BackLink.js';


const Register = () => {
  
  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#808080',
    margin: '15px 0'
  }

  // set initial state to clear out form if registration unsuccessful 
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: null,
    password: ''
  }

  const [registerFormState, setRegisterFormState] = useState(initialState);

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleChange = (evt) => setRegisterFormState({
    ...registerFormState,
    [evt.target.name]: evt.target.value
    }
  );
  
  // sends and receive data from register route to check if user exist
  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerFormState)
      })
    .then(res => {
      if (!(res.ok)) {
        alert('User already exist. Please login.');
        // param needs to be iterable
        setRegisterFormState({...initialState})
      }
      else {
        setRegisterSuccess(true);
      }
    })
  };

  const history = useHistory();

  if (registerSuccess === true) {
    // return <TodoList />
    history.push('/todo-list')
    console.log('Successfully logged in')
  }

  return ( 
    <Grid>
      <BackLink selectedLink={'/'} />
      <Grid>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField 
              required id="standard-required" 
              label="First Name" 
              name="firstName"
              value={registerFormState.firstName}
              onChange={handleChange}
              style={{margin: '0 5px 0 0'}}
            />
            <TextField 
            required id="standard-required" 
            label="Last Name" 
            name="lastName"
            value={registerFormState.lastName}
            onChange={handleChange}
            style={{margin: '0 0 0 5px'}}
            />
          </div>
          <div>
            <TextField 
              required id="standard-required" 
              label="Email" 
              name="email"
              value={registerFormState.email}
              onChange={handleChange}
            />
          </div>
          <div>
        {/* need to validate phone number later */}
            <TextField 
              id="standard-helperText" 
              label="Phone (ex: 1-234-567-8910)" 
              name="phone"
              value={registerFormState.phone}
              onChange={handleChange}
              helperText="optional: if you want text reminders"
            />
          </div>
          <div>
            <TextField
              required id="standard-password-input"
              label="Password"
              type="password"
              name="password"
              value={registerFormState.password}
              onChange={handleChange}
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

export default Register;