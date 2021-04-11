import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const tokenKey = 'token';

const initalState = {
  user: {},
  changeOptions: {
    changePassword: {
      title: 'Change password',
      icon: 'bx bxs-key',
      elementConfig: {
        type: 'password',
      },
      value: '',
      valid: false,
    },
    changeEmail: {
      title: 'Change email',
      icon: 'far fa-envelope',
      elementConfig: {
        type: 'email',
      },
      value: '',
      valid: false,
    },
  },
  error: '',
  successMessage: '',
};

const getAuthenticatedUser = (state, action) => {
  return updateObject(state, action);
};

const getAuthenticatedUserSuccess = (state, action) => {
  return updateObject(state, { user: action.authenticatedUser });
};

const getAuthenticatedUserFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const onUserLogout = (state, action) => {
  localStorage.removeItem(tokenKey);
  return updateObject(state, { user: {} });
};

const updateChange = (state, action) => {
  return updateObject(state, action);
};

const updateChangeSuccess = (state, action) => {
  return updateObject(state, {
    user: action.updatedUser,
    error: '',
    showChangesFormModal: false,
    successMessage: 'Change applied',
  });
};

const updateChangeFail = (state, action) => {
  return updateObject(state, { error: action.error, successMessage: '' });
};

const updateChangeOptions = (state, action) => {
  return updateObject(state, { changeOptions: action.updatedChangeOptions });
};

const cleanMessages = (state, action) => {
  return updateObject(state, { error: '', successMessage: '' });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.GET_AUTH_USER:
      return getAuthenticatedUser(state, action);
    case actionTypes.GET_AUTH_USER_SUCCESS:
      return getAuthenticatedUserSuccess(state, action);
    case actionTypes.GET_AUTH_USER_FAIL:
      return getAuthenticatedUserFail(state, action);
    case actionTypes.LOGOUT_USER:
      return onUserLogout(state, action);
    case actionTypes.UPDATE_CHANGE:
      return updateChange(state, action);
    case actionTypes.UPDATE_CHANGE_SUCCESS:
      return updateChangeSuccess(state, action);
    case actionTypes.UPDATE_CHANGE_FAIL:
      return updateChangeFail(state, action);
    case actionTypes.UPDATE_CHANGE_OPTIONS:
      return updateChangeOptions(state, action);
    case actionTypes.CLEAN_MESSAGES:
      return cleanMessages(state, action);
    default:
      return state;
  }
};

export default reducer;
