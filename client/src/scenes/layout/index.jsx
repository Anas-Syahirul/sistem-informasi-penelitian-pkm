import { Box, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [active, setActive] = useState('');
  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width='100%' height='100%'>
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        active={active}
        setActive={setActive}
      />
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          active={active}
          setActive={setActive}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
