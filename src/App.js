import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Grid } from '@material-ui/core';
import Homepage from './components/Homepage.js';
import TodoList from './components/TodoList';

function App() {
  
  return (
    <Grid container 
          justify="center"
          alignItems="center"
          alignContent="center"
          style={{minHeight: '100vh'}}>
      <Homepage />
      {/* <TodoList /> */}
    </Grid>
  );
}

export default App;
