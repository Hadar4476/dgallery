import React, { useContext } from 'react';
import { SignUpContext } from '../../context/signUpContext';
import { SignInContext } from '../../context/signInContext';

import classes from './Homepage.module.css';

import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

const Homepage = () => {
  const { onDisplaySignUpModal } = useContext(SignUpContext);
  const { onDisplaySignInModal } = useContext(SignInContext);

  const onNavToSignUpHanlder = () => {
    onDisplaySignUpModal();
  };

  const onNavToSignInHanlder = () => {
    onDisplaySignInModal();
  };

  return (
    <div className={classes.Homepage}>
      <div className={classes.Info}>
        <h1>This is a place for young & experienced artists</h1>
        <ul>
          <li>Are you interested in art?</li>
          <li>
            Do you like to express yourself through paintings and sculptors?
          </li>
          <li>Do you like to share your creations with others?</li>
          <li>Do you like to review others creations?</li>
        </ul>
        <p>This is the place for you!</p>
      </div>

      <div className={classes.Navigation}>
        <button onClick={onNavToSignUpHanlder}>SIGN UP NOW</button>
        <p className={classes.Link} onClick={onNavToSignInHanlder}>
          I already have an account
        </p>
      </div>
      <SignUp />
      <SignIn />
    </div>
  );
};

export default Homepage;
