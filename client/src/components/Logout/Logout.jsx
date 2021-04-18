import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { SignInContext } from '../../context/signInContext';
import { useHistory } from 'react-router-dom';

import * as actions from '../../store/actions';

const Logout = (props) => {
  const { onUserLogOutHandler, resetPostData } = props;
  const { onHideSignInModal, setIsTokenValid } = useContext(SignInContext);
  const history = useHistory();

  useEffect(() => {
    onUserLogOutHandler();
    onHideSignInModal();
    setIsTokenValid(false);
    resetPostData();
    history.push('/');
  }, [
    onUserLogOutHandler,
    onHideSignInModal,
    setIsTokenValid,
    resetPostData,
    history,
  ]);

  return null;
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPostData: () => dispatch(actions.resetPostData()),
    onUserLogOutHandler: () => dispatch(actions.onUserLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
