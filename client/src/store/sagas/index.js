import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
  postArtSaga,
  initGallerySaga,
  initMyGallerySaga,
  searchForPostSaga,
  deletePostSaga,
  deleteMyGalleryPostSaga,
} from './gallery';

import { getAuthenticatedUserSaga, updateChangeSaga } from './user';

export function* watchGetAuthenticatedUser() {
  yield takeLatest(actionTypes.GET_AUTH_USER, getAuthenticatedUserSaga);
}

export function* watchPostArt() {
  yield takeLatest(actionTypes.SUBMIT_NEW_POST, postArtSaga);
}

export function* watchGallery() {
  yield takeEvery(actionTypes.INIT_GALLERY, initGallerySaga);
}

export function* watchMyGallery() {
  yield takeEvery(actionTypes.INIT_MY_GALLERY, initMyGallerySaga);
}

export function* watchSearchForPost() {
  yield takeLatest(actionTypes.SEARCH_FOR_POST, searchForPostSaga);
}

export function* watchDeletePost() {
  yield takeLatest(actionTypes.DELETE_POST, deletePostSaga);
}

export function* watchDeleteMyGalleryPost() {
  yield takeLatest(actionTypes.DELETE_MY_GALLERY_POST, deleteMyGalleryPostSaga);
}

export function* watchUpdateChange() {
  yield takeLatest(actionTypes.UPDATE_CHANGE, updateChangeSaga);
}
