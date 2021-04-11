import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Page404.module.css';

const Page404 = () => {
  const robotIconClasses = [classes.RobotIcon, 'fas fa-robot'];

  const history = useHistory();

  const navigateToHome = () => {
    history.push('/');
  };

  return (
    <div className={classes.Page404}>
      <i className={robotIconClasses.join(' ')}></i>
      <h1>Oops, this path is out of reach...</h1>
      <div className={classes.GoBackIcon} onClick={navigateToHome}>
        <i className='fas fa-undo-alt'></i>
      </div>
    </div>
  );
};

export default Page404;
