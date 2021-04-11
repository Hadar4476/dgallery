import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';

import 'popper.js/dist/popper';
import 'jquery/dist/jquery';

import './index.css';
import 'animate.css/animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons';

import App from './App';

import SignUpProvider from './context/signUpContext';
import SignInProvider from './context/signInContext';

import userReducer from './store/reducers/user';
import galleryReducer from './store/reducers/gallery';

import {
  watchGetAuthenticatedUser,
  watchPostArt,
  watchGallery,
  watchMyGallery,
  watchSearchForPost,
  watchDeletePost,
  watchDeleteMyGalleryPost,
  watchUpdateChange,
} from './store/sagas';

import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  user: userReducer,
  gallery: galleryReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleWare))
);

sagaMiddleWare.run(watchGetAuthenticatedUser);
sagaMiddleWare.run(watchPostArt);
sagaMiddleWare.run(watchGallery);
sagaMiddleWare.run(watchMyGallery);
sagaMiddleWare.run(watchSearchForPost);
sagaMiddleWare.run(watchDeletePost);
sagaMiddleWare.run(watchDeleteMyGalleryPost);
sagaMiddleWare.run(watchUpdateChange);

ReactDOM.render(
  <Provider store={store}>
    <SignInProvider>
      <SignUpProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SignUpProvider>
    </SignInProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
