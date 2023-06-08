import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box mb='10px'>
      <Typography
        variant='h2'
        color={theme.palette.secondary[100]}
        fontWeight='bold'
        sx={{ m: '0 0 5px 0' }}
      >
        {title}
      </Typography>
      <Typography variant='h5' color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
