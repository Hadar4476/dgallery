import React, { useState } from 'react';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import axios from '../myaxios';

import $ from 'jquery';

const tokenKey = 'token';

export const SignInContext = React.createContext({
  formModal: {},
  displaySignInModal: false,
  isTokenValid: false,
  error: null,
  onDisplaySignInModal: () => {},
  onHideSignInModal: () => {},
  updateFormModal: () => {},
  onSignInFormSubmit: () => {},
  navigateToGallery: () => {},
  setIsTokenValid: () => {},
});

const SignInContextProvider = (props) => {
  const [formModalState, setFormModalState] = useState({
    email: {
      elementType: 'input',
      labelHTML: 'Email',
      elementConfig: {
        type: 'email',
      },
      value: '',
      valid: false,
    },
    password: {
      elementType: 'input',
      labelHTML: 'Password',
      elementConfig: {
        type: 'password',
      },
      value: '',
      valid: false,
    },
  });

  const [displaySignInModalState, setDisplaySignInModalState] = useState(false);

  const [isTokenValidState, setIsTokenValidState] = useState(false);

  const [errorState, setErrorState] = useState(null);

  const onDisplaySignInModal = () => {
    $(window).scrollTop(0);
    const windowWidth = $(window).width();
    if (windowWidth >= 500) {
      disableBodyScroll(document.getElementsByTagName('body')[0]);
    }
    setDisplaySignInModalState(true);
  };

  const onHideSignInModal = () => {
    $(window).scrollTop(0);
    enableBodyScroll(document.getElementsByTagName('body')[0]);
    setErrorState(null);
    setDisplaySignInModalState(false);
  };

  const updateFormModal = (updatedFormModal) => {
    setFormModalState(updatedFormModal);
  };

  const onSignInFormSubmit = async (user) => {
    await axios
      .post('/auth', user)
      .then((response) => {
        const copyFormModal = { ...formModalState };
        for (const key in copyFormModal) {
          copyFormModal[key].value = '';
          copyFormModal[key].valid = false;
        }
        updateFormModal(copyFormModal);
        enableBodyScroll(document.getElementsByTagName('body')[0]);
        localStorage.setItem(tokenKey, response.data.token);
        setIsTokenValidState(true);
      })
      .catch((error) => setErrorState(error.response.data));
  };

  return (
    <SignInContext.Provider
      value={{
        formModal: formModalState,
        displaySignInModal: displaySignInModalState,
        isTokenValid: isTokenValidState,
        error: errorState,
        onDisplaySignInModal: onDisplaySignInModal,
        onHideSignInModal: onHideSignInModal,
        updateFormModal: updateFormModal,
        onSignInFormSubmit: onSignInFormSubmit,
        setIsTokenValid: setIsTokenValidState,
      }}
    >
      {props.children}
    </SignInContext.Provider>
  );
};

export default SignInContextProvider;
