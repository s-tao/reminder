import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import TodoList from './TodoList.js';
import { Grid, Button } from '@material-ui/core';

const Homepage = () => {
  
  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#808080',
    margin: '5px'
  }

//   const [userClick, setUserClick] = useState(null);

//   if (userClick === 'Login') {
//     return <Login />

//   }

//   if (userClick === 'Register') {
//     return <Register />
//   }


  return (
    <Router>
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
        <Link to="/login">
        <Button 
          variant="contained"
          style={buttonStyle}
        //   onClick={() => setUserClick('Login')}>
        >
            Login
        </Button>
        </Link>
        <Link to="/register">
        <Button 
          variant="contained"
          style={buttonStyle}
        //   onClick={() => setUserClick('Register')}>
        >
            Register
        </Button> 
        </Link>
      </Grid>  
    </Grid>

    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/todo-list">
        <TodoList />
      </Route> 
    </Switch>
    </Router>
  )
};

export default Homepage;