import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Homepage from './components/Homepage.js';
// import TodoList from './components/TodoList';

function App() {
  // const currentRoute= window.location.pathname
  // console.log(currentRoute, 'curr')

  return (
    <Grid container 
          justify="center"
          alignItems="center"
          alignContent="center"
          style={{minHeight: '100vh'}}>
      <Homepage />
    </Grid>
  );
}

export default App;
