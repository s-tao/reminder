import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const BackLink = ({selectedLink}) => {
//   console.log(selectedLink, 'link')
  return (
    <Grid 
        container 
        justify="center"
        alignItems="center"
        alignContent="center">
      <Link to={selectedLink}>
        <p>BACK</p>
      </Link>
    </Grid> 
  )
};

export default BackLink;

