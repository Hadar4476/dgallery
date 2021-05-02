import React, { useState } from 'react';

import classes from './Paganation.module.css';

const Paganation = (props) => {
  const { pageCount, onChangePage, currentPage } = props;

  const pageNumberClasses = [classes.PageNumber];

  const [startingPageNumberState, setStartingPageNumberState] = useState(0);
  const [maxPageNumberState, setMaxPageNumberState] = useState(3);

  const onNextPageSection = () => {
    const maxPage = pageNumbers.slice(
      startingPageNumberState,
      maxPageNumberState
    ).length;
    if (maxPage <= 3) return;
    setStartingPageNumberState((currentState) => (currentState += 3));
    setMaxPageNumberState((currentState) => (currentState += 3));
  };

  const onPreviousPageSection = () => {
    if (!startingPageNumberState) return;
    setStartingPageNumberState((currentState) => (currentState -= 3));
    setMaxPageNumberState((currentState) => (currentState -= 3));
  };

  const pageNumbers = [];
  let pagesList = null;
  for (let i = 0; i < pageCount; i++) {
    pageNumbers.push(i);
  }
  pagesList = pageNumbers
    .slice(startingPageNumberState, maxPageNumberState)
    .map((item) => (
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

  const maxPage = pageNumbers.slice(startingPageNumberState, maxPageNumberState)
    .length;

  return (
    <div className={classes.Paganation}>
      <div className={classes.PagesList}>
        <div className={classes.Previous}>
          <button
            onClick={onPreviousPageSection}
            disabled={!startingPageNumberState}
          >
            <i className='fas fa-angle-double-left'></i>
          </button>
        </div>
        {pagesList}
        <div className={classes.Next}>
          <button onClick={onNextPageSection} disabled={maxPage <= 3}>
            <i className='fas fa-angle-double-right'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paganation;
