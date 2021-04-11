import React from 'react';

import classes from './Footer.module.css';

const Footer = () => {
  const date = new Date();
  return (
    <footer className={classes.Footer}>
      <p>Hadar Yamin &copy; {date.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
