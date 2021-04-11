import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { SignInContext } from './context/signInContext';
import { Switch, Route, useLocation } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent';

import $ from 'jquery';
import * as actions from './store/actions';

import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import MyGallery from './components/MyGallery/MyGallery';
import Logout from './components/Logout/Logout';
import EditProfile from './components/EditProfile/EditProfile';
import Footer from './components/Footer/Footer';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Page404 from './components/Page404/Page404';

const asyncGallery = asyncComponent(() =>
  import('./components/Gallery/Gallery')
);

const tokenKey = 'token';

const App = (props) => {
  const { isTokenValid } = useContext(SignInContext);
  const { user, getAuthenticatedUserHandler } = props;

  const { pathname } = useLocation();
  const silverBGColor = '#e0e0e0';
  const whiteBGColor = 'white';
  const blueColor = '#16bffd';

  const userToken = localStorage.getItem(tokenKey);
  useEffect(() => {
    if (userToken) {
      getAuthenticatedUserHandler();
    }
  }, [userToken, getAuthenticatedUserHandler, isTokenValid]);

  useEffect(() => {
    if (pathname === '/my-gallery') {
      document.body.style.background = silverBGColor;
      $('nav').attr(
        'style',
        `background-color:${whiteBGColor};border-bottom: 2px solid silver`
      );
      $('footer').attr('style', `color:${blueColor}`);
    } else {
      document.body.style.background = null;
      $('nav').attr('style', 'background-color:transparent;border:none');
      $('footer').attr('style', 'color:white');
    }
  }, [pathname]);

  let welcomePage = <Route exact path='/' component={Homepage} />;
  if (userToken) {
    welcomePage = <Route exact path='/' component={asyncGallery} />;
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        <Switch>
          <ProtectedRoute
            user={user}
            path='/edit-profile'
            component={EditProfile}
          />
          <ProtectedRoute
            user={user}
            path='/my-gallery'
            component={MyGallery}
          />
          <Route path='/logout' component={Logout} />
          {welcomePage}
          <Route path='*' exact component={Page404} />
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDipatchToProps = (dispatch) => {
  return {
    getAuthenticatedUserHandler: () => dispatch(actions.getAuthenticatedUser()),
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(App);
