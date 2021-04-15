import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  displayModal: false,
  formModal: {
    caption: {
      elementType: 'input',
      labelHTML: 'Caption',
      elementConfig: {
        type: 'text',
        autoComplete: 'off',
      },
      value: '',
      valid: false,
    },
    image: {
      elementType: 'file',
      labelHTML: 'Upload',
      elementConfig: {
        type: 'file',
        accept: 'image/jpg/image/png/image/jpeg',
      },
      value: '',
      valid: false,
    },
  },
  newPost: {},
  postData: {},
  gallery: [],
  myGallery: [],
  submitPostError: null,
  initMyGalleryError: null,
  searchInput: '',
  deletePostId: '',
  loading: false,
};

const displayPostArtModal = (state, action) => {
  return updateObject(state, { displayModal: true });
};

const hidePostArtModal = (state, action) => {
  return updateObject(state, { displayModal: false, error: null });
};

const updateFormModal = (state, action) => {
  return updateObject(state, { formModal: action.formModal });
};

const submitNewPost = (state, action) => {
  return updateObject(state, { newPost: action.newPost, loading: true });
};

const submitPostSuccess = (state, action) => {
  const resetFormModal = { ...state.formModal };
  for (const key in resetFormModal) {
    resetFormModal[key].value = '';
    resetFormModal[key].valid = false;
  }
  return updateObject(state, {
    postData: action.postData,
    displayModal: false,
    newPost: {},
    submitPostError: null,
    gallery: state.gallery.concat(action.postData),
    formModal: resetFormModal,
    loading: false,
  });
};

const submitPostFail = (state, action) => {
  return updateObject(state, { submitPostError: action.error, loading: false });
};

const initGallery = (state, action) => {
  return updateObject(state, action);
};

const initGallerySuccess = (state, action) => {
  return updateObject(state, { gallery: action.posts });
};

const initGalleryFail = (state, action) => {
  return updateObject(state, {});
};

const resetPostData = (state, action) => {
  return updateObject(state, { postData: {} });
};

const searchForPost = (state, action) => {
  return updateObject(state, { searchInput: action.searchInput });
};

const updateGallery = (state, action) => {
  return updateObject(state, { gallery: action.updatedGallery });
};

const initMyGallery = (state, action) => {
  return updateObject(state, { loading: true });
};

const initMyGallerySuccess = (state, action) => {
  return updateObject(state, {
    myGallery: action.posts,
    initMyGalleryError: null,
    loading: false,
  });
};

const initMyGalleryFail = (state, action) => {
  return updateObject(state, {
    initMyGalleryError: action.error,
    loading: false,
  });
};

const deletePost = (state, action) => {
  return updateObject(state, {
    deletePostId: action.deletePostId,
    loading: true,
  });
};

const deletePostSuccess = (state, action) => {
  const { deletedPost } = action;
  const updateGallery = [...state.gallery];
  const updateMyGallery = [...state.myGallery];
  return updateObject(state, {
    gallery: updateGallery.filter((item) => item._id !== deletedPost._id),
    myGallery: updateMyGallery.filter((item) => item._id !== deletedPost._id),
    loading: false,
  });
};

const deletePostFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const deleteMyGalleryPost = (state, action) => {
  return updateObject(state, {
    deletePostId: action.deletePostId,
    loading: true,
  });
};

const deleteMyGalleryPostSuccess = (state, action) => {
  const { deletedPost } = action;
  const updateGallery = [...state.gallery];
  const updateMyGallery = [...state.myGallery];
  return updateObject(state, {
    gallery: updateGallery.filter((item) => item._id !== deletedPost._id),
    myGallery: updateMyGallery.filter((item) => item._id !== deletedPost._id),
    loading: false,
  });
};

const deleteMyGalleryPostFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return displayPostArtModal(state, action);
    case actionTypes.HIDE_MODAL:
      return hidePostArtModal(state, action);
    case actionTypes.UPDATE_FORM_MODAL:
      return updateFormModal(state, action);
    case actionTypes.SUBMIT_NEW_POST:
      return submitNewPost(state, action);
    case actionTypes.SUBMIT_NEW_POST_SUCCESS:
      return submitPostSuccess(state, action);
    case actionTypes.SUBMIT_NEW_POST_FAIL:
      return submitPostFail(state, action);
    case actionTypes.INIT_GALLERY:
      return initGallery(state, action);
    case actionTypes.INIT_GALLERY_SUCCESS:
      return initGallerySuccess(state, action);
    case actionTypes.INIT_GALLERY_FAIL:
      return initGalleryFail(state, action);
    case actionTypes.RESET_POST_DATA:
      return resetPostData(state, action);
    case actionTypes.SEARCH_FOR_POST:
      return searchForPost(state, action);
    case actionTypes.UPDATE_GALLERY:
      return updateGallery(state, action);
    case actionTypes.INIT_MY_GALLERY:
      return initMyGallery(state, action);
    case actionTypes.INIT_MY_GALLERY_SUCCESS:
      return initMyGallerySuccess(state, action);
    case actionTypes.INIT_MY_GALLERY_FAIL:
      return initMyGalleryFail(state, action);
    case actionTypes.DELETE_POST:
      return deletePost(state, action);
    case actionTypes.DELETE_POST_SUCCESS:
      return deletePostSuccess(state, action);
    case actionTypes.DELETE_POST_FAIL:
      return deletePostFail(state, action);
    case actionTypes.DELETE_MY_GALLERY_POST:
      return deleteMyGalleryPost(state, action);
    case actionTypes.DELETE_MY_GALLERY_POST_SUCCESS:
      return deleteMyGalleryPostSuccess(state, action);
    case actionTypes.DELETE_MY_GALLERY_POST_FAIL:
      return deleteMyGalleryPostFail(state, action);
    default:
      return state;
  }
};

export default reducer;
