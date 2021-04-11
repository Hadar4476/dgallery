import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions';

import classes from './EditProfile.module.css';

import ChangeOption from './ChangeOption/ChangeOption';

const EditProfile = (props) => {
  const {
    changeOptions,
    error,
    successMessage,
    updateChangeOptionsHandler,
    cleanMessagesHandler,
  } = props;

  const history = useHistory();

  const accountIconClasses = [classes.AccountIcon, 'bx bxs-user-rectangle'];
  const goBackIconClasses = [classes.GoBackIcon, 'bx bx-right-arrow-alt'];

  const navigateToHome = () => {
    history.push('/');
  };

  const inputChangedHandler = ({ target }, controlName) => {
    const { value } = target;
    const updatedFormControls = { ...changeOptions };
    updatedFormControls[controlName].value = value;
    updatedFormControls[controlName].valid = checkValidity(value, controlName);
    updateChangeOptionsHandler(updatedFormControls);
  };

  const onResetInput = (controlName) => {
    const updatedFormControls = { ...changeOptions };
    updatedFormControls[controlName].value = '';
    updatedFormControls[controlName].valid = false;
    updateChangeOptionsHandler(updatedFormControls);
  };

  const changeOptionsElementsArray = [];
  for (let key in changeOptions) {
    changeOptionsElementsArray.push({
      id: key,
      config: changeOptions[key],
    });
  }

  let options = null;
  if (changeOptionsElementsArray.length) {
    options = changeOptionsElementsArray.map((item) => (
      <ChangeOption
        key={item.id}
        id={item.id}
        name={item.id}
        elementConfig={item.config.elementConfig}
        icon={item.config.icon}
        title={item.config.title}
        value={item.config.value}
        valid={item.config.valid}
        error={error}
        successMessage={successMessage}
        changed={(event) => inputChangedHandler(event, item.id)}
        resetInput={() => onResetInput(item.id)}
        cleanMessages={cleanMessagesHandler}
      />
    ));
  }

  return (
    <div className={classes.EditProfile}>
      <div className={classes.Heading}>
        <i className={accountIconClasses.join(' ')}></i>
        <p>Account managment</p>
        <i className={goBackIconClasses.join(' ')} onClick={navigateToHome}></i>
      </div>
      <div className={classes.Body}>{options}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    changeOptions: state.user.changeOptions,
    error: state.user.error,
    successMessage: state.user.successMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateChangeOptionsHandler: (updatedChangeOptions) =>
      dispatch(actions.updateChangeOptions(updatedChangeOptions)),
    cleanMessagesHandler: () => dispatch(actions.cleanMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
