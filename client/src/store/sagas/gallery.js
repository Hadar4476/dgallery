import { put, call } from 'redux-saga/effects';
import axios from '../../myaxios';
import jwtDecode from 'jwt-decode';
import { enableBodyScroll } from 'body-scroll-lock';

import * as actions from '../actions';

const tokenKey = 'token';

export function* postArtSaga({ newPost }) {
  const token = yield localStorage.getItem(tokenKey);
  const formData = yield new FormData();
  const headers = yield { 'x-auth-token': token };
  yield call([formData, 'append'], 'caption', newPost.caption);
  yield call([formData, 'append'], 'image', newPost.image);
  try {
    const { data } = yield axios.post('/posts', formData, { headers: headers });
    yield enableBodyScroll(document.getElementsByTagName('body')[0]);
    yield put(actions.submitPostSuccess(data));
  } catch (error) {
    yield put(actions.submitPostFail(error.response.data));
  }
}

export function* initGallerySaga(action) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  const user = yield jwtDecode(token);
  if (user) {
    try {
      const { data } = yield axios.get('/posts', { headers: headers });
      yield put(actions.initGallerySuccess(data));
    } catch (error) {
      return;
    }
  }
}

export function* initMyGallerySaga(action) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  const user = yield jwtDecode(token);
  if (user) {
    try {
      const { data } = yield axios.get('/posts/myGallery', {
        headers: headers,
      });
      yield put(actions.initMyGallerySuccess(data));
    } catch (error) {
      yield put(actions.initMyGalleryFail(error.response.data));
    }
  }
}

export function* searchForPostSaga({ searchInput }) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  try {
    const { data } = yield axios.get(`/posts/search/${searchInput}`, {
      headers: headers,
    });
    yield put(actions.updateGallery(data));
  } catch (error) {
    return;
  }
}

export function* deletePostSaga({ deletePostId }) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  try {
    const { data } = yield axios.delete(`/posts/deletePost/${deletePostId}`, {
      headers: headers,
    });
    yield put(actions.deletePostSuccess(data));
  } catch (error) {
    return;
  }
}

export function* deleteMyGalleryPostSaga({ deletePostId }) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  try {
    const { data } = yield axios.delete(
      `/posts/deleteMyGalleryPost/${deletePostId}`,
      {
        headers: headers,
      }
    );
    yield put(actions.deleteMyGalleryPostSuccess(data));
  } catch (error) {
    return;
  }
}
