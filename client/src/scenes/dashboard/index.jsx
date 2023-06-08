import { Box } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import React from 'react';

const Dashboard = () => {
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />
    </Box>
  );
};

export default Dashboard;
