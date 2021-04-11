import React from 'react';
// import Icon from '../Icon/Icon';

import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      const iconClasses = ['bx bx-x', classes.Icon];
      inputElement = (
        <div className={classes.Input}>
          <input
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            id={props.fieldName}
            name={props.fieldName}
          />
          <i className={iconClasses.join(' ')} onClick={props.resetInput}></i>
          <span className={classes.InputBorderBottom}></span>
          <label className={classes.Label} htmlFor={props.fieldName}>
            {!props.value.length ? props.labelHTML : ''}
          </label>
        </div>
      );
      break;
    case 'file':
      inputElement = (
        <div
          id='file_input_wrapper'
          className={classes.FileInput}
          onClick={() => document.getElementById(props.fieldName).click()}
        >
          <span>Upload</span>
          <input
            {...props.elementConfig}
            onChange={props.changed}
            id={props.fieldName}
            name={props.fieldName}
          />
          <span className={classes.InputBorderBottom}></span>
          <label className={classes.Label} htmlFor={props.fieldName}>
            {!props.value.length ? props.labelHTML : ''}
          </label>
        </div>
      );
      break;
    default:
      break;
  }

  return inputElement;
};

export default Input;
