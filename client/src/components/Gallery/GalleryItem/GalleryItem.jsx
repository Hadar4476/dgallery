import React, { useState } from 'react';
import { connect } from 'react-redux';
import { awsS3URL } from '../../../myaxios';

import * as actions from '../../../store/actions';

import classes from './GalleryItem.module.css';

const animateCSSClasses = {
  fadeIn: 'animate__animated animate__fadeIn',
};

const GalleryItem = (props) => {
  const { user } = props;

  const [didMoreIconClickedState, setDidMoreIconClickedState] = useState(false);

  const galleryItemClasses = [classes.GalleryItem, animateCSSClasses.fadeIn];

  const {
    source,
    username,
    caption,
    iconBGColor,
    userId,
    postId,
    onDeletePost,
  } = props;

  const galleryItemBoxClasses = [classes.Box, 'col-sm-1'];

  const iconClasses = ['bx bx-dots-horizontal-rounded', 'bx bx-x'];

  const onMoreIconClick = () => {
    setDidMoreIconClickedState(!didMoreIconClickedState);
  };

  const onDeletePostHandler = (postId) => {
    onDeletePost(postId);
  };

  let capitalizeUsername = null;
  if (username) {
    capitalizeUsername =
      username[0].toUpperCase() + username.toLowerCase().slice(1);
  }

  let moreIcon = null;
  if (userId === user._id) {
    moreIcon = (
      <div className={classes.MoreIcon} onClick={onMoreIconClick}>
        <i
          className={didMoreIconClickedState ? iconClasses[1] : iconClasses[0]}
        ></i>
      </div>
    );
  }

  return (
    <div className={galleryItemBoxClasses}>
      <div className={galleryItemClasses.join(' ')}>
        <div className={classes.Top}>
          <div
            className={classes.UserIcon}
            style={{ backgroundColor: iconBGColor }}
          >
            <span>{username[0].toUpperCase()}</span>
          </div>
          <h5>{capitalizeUsername}</h5>
        </div>
        <div className={classes.Image}>
          <div
            className={
              didMoreIconClickedState ? classes.WhiteBox : classes.Hidden
            }
          >
            <button onClick={() => onDeletePostHandler(postId)}>Delete</button>
          </div>
          <img src={`${awsS3URL}${source}`} alt={caption} />
        </div>
        <div className={classes.Bottom}>
          <p title={caption}>{caption}</p>
          {moreIcon}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePost: (postId) => dispatch(actions.deletePost(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
