import { Google } from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import LoginForm from 'components/LoginForm';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from 'state';

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const isAuth = Boolean(useSelector((state) => state.token));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  // const getFinishedPkm = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://localhost:3001/activity/finished-pkm',
  //       {
  //         method: 'GET',
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     const data = await response.json();
  //     setPkm(data);
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  useEffect(() => {
    if (isAuth) {
      getUser();
    }
  }, []);
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      '_self'
    );
  };

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
      <Button
        startIcon={<Google />}
        variant='contained'
        color='primary'
        onClick={googleAuth}
      >
        Sign In With Google
      </Button>
    </Box>
  );
};

export default Login;
