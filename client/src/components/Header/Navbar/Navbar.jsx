import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Navbar.module.css';
import UserMenu from './UserMenu/UserMenu';
import PostArt from './PostArt/PostArt';

const Navbar = (props) => {
  const { user } = props;

  const [displayUserMenuState, setDisplayUserMenuState] = useState(false);

  const history = useHistory();

  const toggleUserMenuDisplay = () => {
    setDisplayUserMenuState(
      (currentDisplayUserMenuState) => !currentDisplayUserMenuState
    );
  };

  const hideUserMenu = () => {
    setDisplayUserMenuState(false);
  };

  const navToHomePage = () => {
    history.push('/');
  };

  useEffect(() => {
    const main = document.getElementsByTagName('main')[0];
    const logo = document.getElementById('logo');
    main.addEventListener('click', () => setDisplayUserMenuState(false));
    logo.addEventListener('click', () => setDisplayUserMenuState(false));
  }, [setDisplayUserMenuState]);

  let userIcon = null;
  if (user && user.username) {
    userIcon = (
      <div
        className={classes.UserIcon}
        style={{ backgroundColor: user.iconBGColor }}
        onClick={toggleUserMenuDisplay}
      >
        <span>{user?.username[0].toUpperCase()}</span>
      </div>
    );
  }

  return (
    <React.Fragment>
      <nav className={classes.Navbar}>
        <div id='logo' className={classes.Logo}>
          <h1 onClick={navToHomePage}>DGallery</h1>
        </div>
        <div className={classes.Options}>
          <PostArt displayUserMenu={() => setDisplayUserMenuState(false)} />
          {userIcon}
        </div>
      </nav>
      <UserMenu
        shouldDisplay={displayUserMenuState}
        hideUserMenu={hideUserMenu}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Navbar);
