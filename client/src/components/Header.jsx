import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';
import UserMsg from '../components/UserMsg.jsx';
import { ReactComponent as EnvelopeIcon } from '../assets/imgs/icons/envelope-icon.svg';

import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logoutSvg from '../assets/imgs/logout.svg';

const Header = () => {
  const dispatch = useDispatch();
  const { userMsg } = useSelector((state) => state.systemReducer);
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <header className="sidebar__profile">
      {userMsg.txt && <UserMsg msg={userMsg} />}
      <button className="messages">
        {/* <EnvelopeIcon /> */}
        {/* <span className="notification"></span> */}
        {/* {userHasNotification && <span className="notification">
                {notificationCount}
            </span>} */}
      </button>

      <img onClick={handelLogout} src={logoutSvg} alt="logout" className="sidebar__logout" />
      <div className="sidebar__avatar">
        <span>
          <p>{`${user.firstname} ${user.lastname}`}</p>
        </span>

        <Avatar
          alt={user.firstName}
          // src="/static/images/avatar/1.jpg"
          sx={{ width: 48, height: 48, bgcolor: pink[500] }}
          id="avatar"
          aria-controls={open ? 'menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        ></Avatar>
      </div>
      <Menu
        id="menu"
        aria-labelledby="avatar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      ></Menu>
    </header>
  );
};

export default Header;
