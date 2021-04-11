import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Spinner from '../UI/Spinner/Spinner';

import classes from './MyGallery.module.css';

import MyGalleryItem from './MyGalleryItem/MyGalleryItem';

const MyGallery = (props) => {
  const { user } = props;

  const {
    myGallery,
    onInitMyGallery,
    error,
    onDisplayPostArtModal,
    loading,
  } = props;

  const [myGalleryState, setMyGalleryState] = useState([]);

  const bodyClasses = [classes.Body, 'container'];
  const iconClasses = ['fas fa-plus', classes.IconBlackColor];

  const myGalleryItemsWrapper = [
    classes.MyGalleryItemsWrapper,
    'row row-cols-1 row-cols-xs-2 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3',
  ];

  useEffect(() => {
    onInitMyGallery();
  }, [onInitMyGallery]);

  useEffect(() => {
    setMyGalleryState([...myGallery].reverse());
  }, [myGallery]);

  const onDisplayPostArtModalHandler = () => {
    onDisplayPostArtModal();
  };

  let errorMessage = null;
  if (error || (!myGallery.length && !loading)) {
    errorMessage = (
      <div className={classes.Error}>
        <h2>Looks like your gallery is empty</h2>
        <div className={classes.PostArt} onClick={onDisplayPostArtModalHandler}>
          <i className={iconClasses.join(' ')}></i>
        </div>
      </div>
    );
  }

  let myGalleryItems = null;
  if (myGalleryState.length) {
    myGalleryItems = myGalleryState.map((item) => (
      <MyGalleryItem
        key={item._id}
        postId={item._id}
        source={item.image}
        caption={item.caption}
      />
    ));
  }

  let headerContent = null;
  if (user && user.username) {
    headerContent = <h1>{user.username}'s Gallery</h1>;
  }

  return (
    <div className={classes.MyGallery}>
      <Spinner />
      <div className={classes.Header}>{headerContent}</div>
      {errorMessage}
      <div className={bodyClasses.join(' ')}>
        <div className={myGalleryItemsWrapper.join(' ')}>{myGalleryItems}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myGallery: state.gallery.myGallery,
    error: state.gallery.initMyGalleryError,
    loading: state.gallery.loading,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitMyGallery: () => dispatch(actions.initMyGallery()),
    onDisplayPostArtModal: () => dispatch(actions.displayPostArtModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGallery);
