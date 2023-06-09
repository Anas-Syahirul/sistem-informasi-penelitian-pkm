import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  NotificationsNoneOutlined,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FlexBetween from './FlexBetween';
import { setLogout, setMode } from 'state';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, active, setActive }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <NotificationsNoneOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='User Account'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate(`profile`);
                  setActive('profile');
                  setAnchorElUser(null);
                }}
              >
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <Typography textAlign='center'>Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
