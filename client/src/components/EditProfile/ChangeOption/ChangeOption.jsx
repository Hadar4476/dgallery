import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import classes from './ChangeOption.module.css';

const animateCSSClasses = {
  slideInRight: 'animate__animated animate__slideInRight animate__faster',
};

const ChangeOption = (props) => {
  const { onUpdateChange } = props;

  const [displayChangeWindowState, setDisplayChangeWindowState] = useState(
    false
  );

  const changeWindowRef = useRef(null);

  const changeWindowClasses = [classes.ChangeWindow];

  const iconClasses = ['bx bx-x', classes.Icon];
  const goBackIconClasses = [classes.GoBackIcon, 'bx bx-right-arrow-alt'];

  const displayChangeWindow = () => {
    setDisplayChangeWindowState(true);
  };

  const hideChangeWindow = () => {
    setDisplayChangeWindowState(false);
    props.resetInput();
    props.cleanMessages();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!props.valid) return;
    const updateChange = [props.name, props.value];
    onUpdateChange(updateChange);
  };

  let message = null;
  if (props.error.length > 1) {
    message = <p className={classes.Error}>{props.error}</p>;
  }

  if (props.successMessage.length > 1) {
    message = <p className={classes.SuccessMessage}>{props.successMessage}</p>;
  }

  return (
    <React.Fragment>
      <div
        ref={changeWindowRef}
        className={
          displayChangeWindowState
            ? [...changeWindowClasses, animateCSSClasses.slideInRight].join(' ')
            : classes.Hide
        }
      >
        <div className={classes.Heading}>
          <i
            className={goBackIconClasses.join(' ')}
            onClick={hideChangeWindow}
          ></i>
        </div>
        <div className={classes.Body}>
          <form onSubmit={onFormSubmit}>
            <label htmlFor={props.id}>{props.title}</label>
            <div className={classes.MessageWrapper}>{message}</div>
            <div className={classes.Input}>
              <input
                {...props.elementConfig}
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.changed}
              />
              <i
                className={iconClasses.join(' ')}
                onClick={props.resetInput}
              ></i>
            </div>
            <button disabled={!props.valid}>Confirm</button>
          </form>
        </div>
      </div>
      <div className={classes.ChangeOption} onClick={displayChangeWindow}>
        <i className={props.icon}></i>
        <button>{props.title}</button>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateChange: (changeName) => dispatch(actions.updateChange(changeName)),
  };
};

export default connect(null, mapDispatchToProps)(ChangeOption);
