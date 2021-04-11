import React from 'react';

import classes from './SearchBar.module.css';

const SearchBar = (props) => {
  const { suggestionsItems, changed, submit } = props;

  const searchBarClasses = [classes.SearchBar];

  const onEnterKeyPress = (event) => {
    const { value } = event.target;
    if (!value.trim()) return;
    if (event.keyCode === 13) {
      event.preventDefault();
      submit();
    }
  };

  if (suggestionsItems.length) {
    searchBarClasses.push(classes.RemoveBottomBorderRadius);
  }

  return (
    <div className={searchBarClasses.join(' ')}>
      <label htmlFor='search_bar_input'></label>
      <input
        autoComplete='off'
        type='text'
        id='search_bar_input'
        placeholder='Search'
        onChange={changed}
        onKeyUp={(event) => onEnterKeyPress(event)}
      />
      <i className='fas fa-search' onClick={submit}></i>
    </div>
  );
};

export default SearchBar;
