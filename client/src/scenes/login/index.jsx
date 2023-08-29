import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import LoginForm from 'components/LoginForm';
import React from 'react';

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography fontWeight='bold' fontSize='32px' color='secondary'>
          Sistem Informasi
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight='500'
          variant='h4'
          sx={{ mb: '1.5rem' }}
          textAlign={'center'}
        >
          Selamat Datang Kembali!
        </Typography>
        <Typography
          fontWeight='500'
          variant='h6'
          sx={{ mb: '1.5rem' }}
          textAlign={'center'}
        >
          Silakan Masuk dengan Email
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
