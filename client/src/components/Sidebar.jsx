import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import {
  ChevronLeft,
  ChevronRightOutlined,
  Diversity1Outlined,
  HomeOutlined,
  LoginOutlined,
  Person2Outlined,
  SchoolOutlined,
  ScienceOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from 'state';

const navItemsDosen = [
  {
    text: 'Dashboard',
    route: null,
    icon: <HomeOutlined />,
  },
  {
    text: 'Profile',
    route: null,
    icon: <Person2Outlined />,
  },
  {
    text: 'Daftar Penelitian dan PkM yang telah Selesai',
    icon: null,
  },
  {
    text: 'Penelitian',
    route: 'finished-research',
    icon: <ScienceOutlined />,
  },
  {
    text: 'Pengabdian Masyarakat',
    route: 'finished-pkm',
    icon: <Diversity1Outlined />,
  },
  {
    text: ' ',
    icon: null,
  },
  {
    text: 'Log Out',
    route: null,
    icon: <LoginOutlined />,
  },
];

const navItemsLppm = [
  {
    text: 'Dashboard',
    route: null,
    icon: <HomeOutlined />,
  },
  {
    text: 'Profile',
    route: null,
    icon: <Person2Outlined />,
  },
  {
    text: 'Daftar Penelitian dan PkM yang telah Selesai',
    icon: null,
  },
  {
    text: 'Penelitian',
    route: 'finished-research',
    icon: <ScienceOutlined />,
  },
  {
    text: 'Pengabdian Masyarakat',
    route: 'finished-pkm',
    icon: <Diversity1Outlined />,
  },
  {
    text: ' ',
    icon: null,
  },
  {
    text: 'Log Out',
    route: null,
    icon: <LoginOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  active,
  setActive,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navItems = user.role === 'Dosen' ? navItemsDosen : navItemsLppm;

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component='nav'>
      {/* {isSidebarOpen && ( */}
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant='persistent'
        anchor='left'
        sx={{
          width: isSidebarOpen ? drawerWidth : 0,
          '& .MuiDrawer-paper': {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSizing: 'border-box',
            borderWidth: isNonMobile ? 0 : '2px',
            width: drawerWidth,
          },
        }}
      >
        <Box width='100%'>
          <Box m='1.5rem 2rem 2rem 2rem'>
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display='flex' alignItems='center' gap='0.5rem'>
                <Typography variant='h4' fontWeight='bold'>
                  SISTEM INFORMASI
                </Typography>
              </Box>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, route, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: '2.25rem 0 1rem 2rem' }}>
                    {text}
                  </Typography>
                );
              }
              const lowerCaseText = route
                ? route.toLocaleLowerCase()
                : text.toLocaleLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={
                      lowerCaseText === 'log out'
                        ? () => dispatch(setLogout())
                        : () => {
                            navigate(`${lowerCaseText}`);
                            setActive(lowerCaseText);
                          }
                    }
                    sx={{
                      backgroundColor:
                        active === lowerCaseText
                          ? theme.palette.secondary[300]
                          : 'transparent',
                      color:
                        active === lowerCaseText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: '1rem',
                        color:
                          active === lowerCaseText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lowerCaseText && (
                      <ChevronRightOutlined sx={{ ml: 'auto' }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Box position='absolute' bottom='2rem'>
            <Divider />
            <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0 2rem'>
              <Box
                component='img'
                alt='profile'
                src={user.profilePicture}
                height='40px'
                width='40px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.9rem'
                  sx={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize='0.8rem'
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.role}
                </Typography>
              </Box>
              <SchoolOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
              />
            </FlexBetween>
          </Box>
        </Box>
      </Drawer>
      {/* )} */}
    </Box>
  );
};

export default Sidebar;
