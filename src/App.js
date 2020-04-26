import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Grid } from '@material-ui/core';
import Homepage from './components/Homepage.js';

function App() {
  
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
