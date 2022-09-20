import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';
import UserMsg from '../components/UserMsg.jsx';
import { ReactComponent as EnvelopeIcon } from '../assets/imgs/icons/envelope-icon.svg';

import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
    // setAnchorEl(null);
    dispatch(logout());
    console.log(isAuthenticated);
  };

  return (
    <header className="flex justify-end align-center">
      {userMsg.txt && <UserMsg msg={userMsg} />}
      <button className="messages">
        {/* <EnvelopeIcon /> */}
        {/* <span className="notification"></span> */}
        {/* {userHasNotification && <span className="notification">
                {notificationCount}
            </span>} */}
      </button>
      <p>{user?.name}</p>
      <Avatar
        alt={user?.name}
        // src="/static/images/avatar/1.jpg"
        sx={{ width: 48, height: 48, bgcolor: pink[500] }}
        id="avatar"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      ></Avatar>
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
      >
        <MenuItem onClick={handelLogout}>{isAuthenticated ? 'Logout' : 'Login'}</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
