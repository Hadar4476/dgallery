import React from 'react';

import classes from './Error.module.css';

const Error = (props) => {
  let error = null;
  if (props.error) {
    error = <p className={classes.Error}>{props.error}</p>;
  }
  return error;
};

export default Error;
