import React from 'react';
import classes from './Error.module.css'
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Paper elevation={6} className={classes.container}>
      <h1>Error</h1>
      <p>Cannot find this page!!</p>
      <Link to="/posts" style={{textDecoration:"none"}}>Retun to HomePage.</Link>
    </Paper>
  )
}

export default Error;