import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from 'state';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Google } from '@mui/icons-material';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('This field is required'),
  password: yup.string().required('This field is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [isEmailNotValid, setIsEmailNotValid] = useState(false);
  const [isPassNotValid, setIsPassNotValid] = useState(false);
  const handleCloseEmail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsEmailNotValid(false);
  };
  const handleClosePass = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsPassNotValid(false);
  };

  const login = async (values, onSubmitProps) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const loggedIn = await response.json();
      onSubmitProps.resetForm();
      if (loggedIn.user) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate('/dashboard');
      }
      if (loggedIn.msg === 'Invalid Email') {
        setIsEmailNotValid(true);
      }
      if (loggedIn.msg === 'Invalid Password') {
        setIsPassNotValid(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label='Password'
                type='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name='password'
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />

              <Box>
                <Button
                  fullWidth
                  type='submit'
                  sx={{
                    m: '2rem 0',
                    p: '1rem',
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  LOG IN
                </Button>
              </Box>
            </Box>
            {/* <Button
              startIcon={<Google />}
              variant='contained'
              color='primary'
              // onClick={googleAuth}
            >
              Sign In With Google
            </Button> */}
          </form>
        )}
      </Formik>
      <Snackbar
        open={isEmailNotValid}
        autoHideDuration={5000}
        onClose={handleCloseEmail}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseEmail}
          severity='error'
          sx={{ width: '100%' }}
        >
          Email Salah!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isPassNotValid}
        autoHideDuration={5000}
        onClose={handleClosePass}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClosePass}
          severity='error'
          sx={{ width: '100%' }}
        >
          Password Salah!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
