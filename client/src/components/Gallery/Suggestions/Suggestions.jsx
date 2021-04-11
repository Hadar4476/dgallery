import React from 'react';

import classes from './Suggestions.module.css';

const Suggestions = (props) => {
  const { suggestionsItems, submit } = props;

  let content = null;
  if (suggestionsItems.length) {
    content = (
      <div className={classes.SuggestionsWrapper}>
        <div className={classes.Suggestions}>
          {suggestionsItems.map((item) => (
            <div
              className={classes.SuggestionItem}
              onClick={() => submit(item.caption)}
              key={item._id}
            >
              <p>{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return content;
};

export default Suggestions;
