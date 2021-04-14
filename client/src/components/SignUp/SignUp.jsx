import React, { useContext } from 'react';
import { SignUpContext } from '../../context/signUpContext';
import { checkValidity } from '../../shared/utility';

import classes from './SignUp.module.css';

import Input from '../UI/Input/Input';
import Error from '../UI/Error/Error';

const animateCSSClasses = {
  fadeIn: 'animate__animated animate__fadeIn',
  fadeInDown: 'animate__animated animate__fadeInDown',
};

const SignUp = () => {
  const {
    formModal,
    displaySignUpModal,
    error,
    onHideSignUpModal,
    updateFormModal,
    onSignUpFormSubmit,
  } = useContext(SignUpContext);

  const inputChangedHandler = ({ target }, controlName) => {
    const updatedFormControls = { ...formModal };
    const { value } = target;
    updatedFormControls[controlName].value = value;
    updatedFormControls[controlName].valid = checkValidity(value, controlName);
    updateFormModal(updatedFormControls);
  };

  const onResetInput = (controlName) => {
    const updatedFormControls = { ...formModal };
    updatedFormControls[controlName].value = '';
    updatedFormControls[controlName].valid = false;
    updateFormModal(updatedFormControls);
  };

  const onSignUpFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    let mapFormToUser = {};
    for (let key in formModal) {
      mapFormToUser[key] = formModal[key].value;
    }
    onSignUpFormSubmit(mapFormToUser);
  };

  const formElementsArray = [];
  for (let key in formModal) {
    formElementsArray.push({
      id: key,
      config: formModal[key],
    });
  }

  const mapFormInputsValidations = formElementsArray.map(
    (item) => item.config.valid
  );
  let isFormValid = false;
  if (mapFormInputsValidations.every((item) => item)) {
    isFormValid = true;
  }

  const darkBoxClasses = [classes.DarkBox, animateCSSClasses.fadeIn];
  const signUpFormClasses = [classes.SignUp, animateCSSClasses.fadeInDown];

  let form = null;
  if (displaySignUpModal) {
    form = (
      <React.Fragment>
        <div
          className={darkBoxClasses.join(' ')}
          onClick={onHideSignUpModal}
        ></div>
        <form
          className={signUpFormClasses.join(' ')}
          onSubmit={onSignUpFormSubmitHandler}
        >
          <div className={classes.Header}>
            <i className='fas fa-times' onClick={onHideSignUpModal}></i>
            <h1>Create an account</h1>
          </div>
          <Error error={error} />
          <div className={classes.FormGroupsWrapper}>
            {formElementsArray.map((item) => (
              <Input
                key={item.id}
                fieldName={item.id}
                elementType={item.config.elementType}
                labelHTML={item.config.labelHTML}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
                invalid={!item.config.valid}
                changed={(event) => inputChangedHandler(event, item.id)}
                resetInput={() => onResetInput(item.id)}
              />
            ))}
          </div>
          <button className={classes.Confirm} disabled={!isFormValid}>
            Confirm
          </button>
        </form>
      </React.Fragment>
    );
  }

  return form;
};

export default SignUp;
