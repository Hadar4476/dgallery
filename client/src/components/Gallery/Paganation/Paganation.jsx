import React from 'react';

import classes from './Paganation.module.css';

const Paganation = (props) => {
  const { pageCount, onChangePage, currentPage } = props;

  const pageNumberClasses = [classes.PageNumber];

  const pageNumbers = [];
  let pagesList = null;
  for (let i = 0; i < pageCount; i++) {
    pageNumbers.push(i);
  }
  pagesList = pageNumbers.map((item) => (
    <li
      key={item}
      className={
        item === currentPage
          ? [...pageNumberClasses, classes.Active].join(' ')
          : pageNumberClasses.join(' ')
      }
      onClick={() => onChangePage(item)}
    >
      <span>{`${item + 1}`}</span>
    </li>
  ));

  return (
    <div className={classes.Paganation}>
      <ul className={classes.PagesList}>{pagesList}</ul>
    </div>
  );
};

export default Paganation;
