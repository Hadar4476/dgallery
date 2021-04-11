import * as actionTypes from './actionTypes';

export const getAuthenticatedUser = () => {
  return {
    type: actionTypes.GET_AUTH_USER,
  };
};

export const getAuthenticatedUserSuccess = (authenticatedUser) => {
  return {
    type: actionTypes.GET_AUTH_USER_SUCCESS,
    authenticatedUser: authenticatedUser,
  };
};

export const getAuthenticatedUserFail = (error) => {
  return {
    type: actionTypes.GET_AUTH_USER_FAIL,
    error: error,
  };
};

export const onUserLogout = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

export const updateChange = (changeName) => {
  return {
    type: actionTypes.UPDATE_CHANGE,
    changeName: changeName,
  };
};

export const updateChangeSuccess = (updatedUser) => {
  return {
    type: actionTypes.UPDATE_CHANGE_SUCCESS,
    updatedUser: updatedUser,
  };
};

export const updateChangeFail = (error) => {
  return {
    type: actionTypes.UPDATE_CHANGE_FAIL,
    error: error,
  };
};

export const updateChangeOptions = (updatedChangeOptions) => {
  return {
    type: actionTypes.UPDATE_CHANGE_OPTIONS,
    updatedChangeOptions: updatedChangeOptions,
  };
};

export const cleanMessages = () => {
  return {
    type: actionTypes.CLEAN_MESSAGES,
  };
};
