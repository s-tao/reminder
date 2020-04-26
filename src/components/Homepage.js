import React, { useState } from 'react';
import Login from './Login.js';
import Register from './Register.js';
import { Grid, Button } from '@material-ui/core';

const Homepage = () => {
  
  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#808080',
    margin: '5px'
  }

  const [userClick, setUserClick] = useState(null);

  if (userClick === 'Login') {
    return <Login />
  }

  if (userClick === 'Register') {
    return <Register />
  }


  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center">
      <Grid 
        item xs={12} 
        container
        justify="center"
        alignItems="center">
        <h1>Reminder</h1>
      </Grid>
      <Grid>
        <Button 
          variant="contained"
          style={buttonStyle}
          onClick={() => setUserClick('Login')}>
            Login
        </Button>
        <Button 
          variant="contained"
          style={buttonStyle}
          onClick={() => setUserClick('Register')}>
            Register
        </Button> 
      </Grid>  
    </Grid>
  )
};

export default Homepage;