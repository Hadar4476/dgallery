import * as actionTypes from './actionTypes';

export const displayPostArtModal = () => {
  return {
    type: actionTypes.SHOW_MODAL,
  };
};

export const hidePostArtModal = () => {
  return {
    type: actionTypes.HIDE_MODAL,
  };
};

export const updateFormModal = (updatedFormModal) => {
  return {
    type: actionTypes.UPDATE_FORM_MODAL,
    formModal: updatedFormModal,
  };
};

export const submitPost = (newPost) => {
  return {
    type: actionTypes.SUBMIT_NEW_POST,
    newPost: newPost,
  };
};

export const submitPostSuccess = (postData) => {
  return {
    type: actionTypes.SUBMIT_NEW_POST_SUCCESS,
    postData: postData,
  };
};

export const submitPostFail = (error) => {
  return {
    type: actionTypes.SUBMIT_NEW_POST_FAIL,
    error: error,
  };
};

export const initGalleryFail = (error) => {
  return {
    type: actionTypes.INIT_GALLERY_FAIL,
    error: error,
  };
};
export const initGallerySuccess = (posts) => {
  return {
    type: actionTypes.INIT_GALLERY_SUCCESS,
    posts: posts,
  };
};
export const initGallery = () => {
  return {
    type: actionTypes.INIT_GALLERY,
  };
};

export const resetPostData = () => {
  return {
    type: actionTypes.RESET_POST_DATA,
  };
};

export const searchForPost = (searchInput) => {
  return {
    type: actionTypes.SEARCH_FOR_POST,
    searchInput: searchInput,
  };
};

export const updateGallery = (updatedGallery) => {
  return {
    type: actionTypes.UPDATE_GALLERY,
    updatedGallery: updatedGallery,
  };
};

export const initMyGalleryFail = (error) => {
  return {
    type: actionTypes.INIT_MY_GALLERY_FAIL,
    error: error,
  };
};
export const initMyGallerySuccess = (posts) => {
  return {
    type: actionTypes.INIT_MY_GALLERY_SUCCESS,
    posts: posts,
  };
};
export const initMyGallery = () => {
  return {
    type: actionTypes.INIT_MY_GALLERY,
  };
};

export const deletePostFail = (error) => {
  return {
    type: actionTypes.DELETE_POST_FAIL,
    error: error,
  };
};
export const deletePostSuccess = (deletedPost) => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
    deletedPost: deletedPost,
  };
};
export const deletePost = (deletePostId) => {
  return {
    type: actionTypes.DELETE_POST,
    deletePostId: deletePostId,
  };
};

export const deleteMyGalleryPostFail = (error) => {
  return {
    type: actionTypes.DELETE_MY_GALLERY_POST_FAIL,
    error: error,
  };
};
export const deleteMyGalleryPostSuccess = (deletedPost) => {
  return {
    type: actionTypes.DELETE_MY_GALLERY_POST_SUCCESS,
    deletedPost: deletedPost,
  };
};
export const deleteMyGalleryPost = (deletePostId) => {
  return {
    type: actionTypes.DELETE_MY_GALLERY_POST,
    deletePostId: deletePostId,
  };
};
