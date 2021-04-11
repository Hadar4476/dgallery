import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import classes from './UserMenu.module.css';

const UserMenu = (props) => {
  const { user } = props;

  const history = useHistory();

  const navigateToMyGallery = () => {
    history.push('/my-gallery');
    props.hideUserMenu();
  };

  const navigateToEditProfile = () => {
    history.push('/edit-profile');
    props.hideUserMenu();
  };

  const navigateToLogout = () => {
    history.push('/logout');
    props.hideUserMenu();
  };

  let capitalizedFirstLetter = null;
  let capitalizeUsername = null;
  if (user.username) {
    capitalizeUsername =
      user.username[0].toUpperCase() + user.username.toLowerCase().slice(1);
    capitalizedFirstLetter = user.username[0].toUpperCase();
  }

  let content = null;
  if (props.shouldDisplay) {
    content = (
      <div className={classes.UserMenuWrapper}>
        <div className={classes.UserMenu}>
          <div className={classes.Header}>
            <div className={classes.Top}>
              <div
                className={classes.UserIcon}
                style={{ backgroundColor: user.iconBGColor }}
              >
                <span>{capitalizedFirstLetter}</span>
              </div>
              <h5 title={capitalizeUsername}>{capitalizeUsername}</h5>
            </div>
            <div className={classes.Bottom}>
              <p title={user.email}>{user.email}</p>
            </div>
          </div>

          <div className={classes.Body}>
            <div onClick={navigateToMyGallery}>
              <i className='bx bxs-image'></i>
              <button>My Gallery</button>
            </div>
            <div onClick={navigateToEditProfile}>
              <i className='bx bx-edit'></i>
              <button>Edit Profile</button>
            </div>
          </div>

          <div className={classes.Footer}>
            <div onClick={navigateToLogout}>
              <i className='bx bx-exit'></i>
              <button>Logout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(UserMenu);
