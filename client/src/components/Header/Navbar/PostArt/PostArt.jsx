import React from 'react';
import { connect } from 'react-redux';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import { useLocation } from 'react-router-dom';

import $ from 'jquery';

import * as actions from '../../../../store/actions';

import classes from './PostArt.module.css';
import PostModal from './PostModal/PostModal';

const PostArt = (props) => {
  const {
    user,
    displayModal,
    onDisplayPostArtModal,
    onHidePostArtModal,
    displayUserMenu,
  } = props;

  const { pathname } = useLocation();

  const iconClasses = ['fas fa-plus'];

  const onDisplayPostArtModalHandler = () => {
    const windowWidth = $(window).width();
    if (windowWidth >= 500) {
      disableBodyScroll(document.getElementsByTagName('body')[0]);
    }
    displayUserMenu();
    onDisplayPostArtModal();
  };

  const onHidePostArtModalHandler = () => {
    $(window).scrollTop(0);
    enableBodyScroll(document.getElementsByTagName('body')[0]);
    onHidePostArtModal();
  };

  let content = null;
  if (
    user &&
    user.username &&
    (pathname === '/' || pathname === '/my-gallery')
  ) {
    content = (
      <React.Fragment>
        <div className={classes.PostArt} onClick={onDisplayPostArtModalHandler}>
          <i
            className={
              pathname === '/my-gallery'
                ? [...iconClasses, classes.IconBlackColor].join(' ')
                : iconClasses.join(' ')
            }
          ></i>
        </div>
        <PostModal
          display={displayModal}
          hideModal={onHidePostArtModalHandler}
        />
      </React.Fragment>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    displayModal: state.gallery.displayModal,
    user: state.user.user,
  };
};

const mapDispatchToPropS = (dispatch) => {
  return {
    onDisplayPostArtModal: () => dispatch(actions.displayPostArtModal()),
    onHidePostArtModal: () => dispatch(actions.hidePostArtModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToPropS)(PostArt);
