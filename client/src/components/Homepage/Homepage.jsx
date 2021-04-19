import React, { useContext } from 'react';
import { SignUpContext } from '../../context/signUpContext';
import { SignInContext } from '../../context/signInContext';

import classes from './Homepage.module.css';

import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

const Homepage = () => {
  const { onDisplaySignUpModal } = useContext(SignUpContext);
  const { onDisplaySignInModal, onSignInFormSubmit } = useContext(
    SignInContext
  );

  const onNavToSignUpHanlder = () => {
    onDisplaySignUpModal();
  };

  const onNavToSignInHanlder = () => {
    onDisplaySignInModal();
  };

  const onSignInAsGuestHandler = () => {
    const guest = {
      email: 'guest@gmail.com',
      password: '123456',
    };
    onSignInFormSubmit(guest);
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
        <div className={classes.Guest}>
          <button onClick={onSignInAsGuestHandler}>Try as guest</button>
        </div>
        <div className={classes.SignUp}>
          <button onClick={onNavToSignUpHanlder}>Sign up now</button>
        </div>
        <div className={classes.SignIn}>
          <p className={classes.Link} onClick={onNavToSignInHanlder}>
            I already have an account
          </p>
        </div>
      </div>
      <SignUp />
      <SignIn />
    </div>
  );
};

export default Homepage;
