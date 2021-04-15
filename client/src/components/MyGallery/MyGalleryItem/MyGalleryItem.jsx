import React, { useState } from 'react';
import { connect } from 'react-redux';
import { awsS3URL } from '../../../myaxios';

import * as actions from '../../../store/actions';

import classes from './MyGalleryItem.module.css';

const animateCSSClasses = {
  fadeIn: 'animate__animated animate__fadeIn',
};

const MyGalleryItem = (props) => {
  const { source, caption, postId, onDeletePost } = props;

  const [didMoreIconClickedState, setDidMoreIconClickedState] = useState(false);

  const iconClasses = ['bx bx-dots-horizontal-rounded', 'bx bx-x'];

  const onMoreIconClick = () => {
    setDidMoreIconClickedState(!didMoreIconClickedState);
  };

  const onDeletePostHandler = (postId) => {
    onDeletePost(postId);
  };

  const myGalleryItemClasses = [
    classes.MyGalleryItem,
    animateCSSClasses.fadeIn,
  ];

  const myGalleryItemBoxClasses = [classes.Box, 'col-md-1'];

  return (
    <div className={myGalleryItemBoxClasses}>
      <div className={myGalleryItemClasses.join(' ')}>
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
          <div className={classes.MoreIcon} onClick={onMoreIconClick}>
            <i
              className={
                didMoreIconClickedState ? iconClasses[1] : iconClasses[0]
              }
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePost: (postId) => dispatch(actions.deleteMyGalleryPost(postId)),
  };
};

export default connect(null, mapDispatchToProps)(MyGalleryItem);
