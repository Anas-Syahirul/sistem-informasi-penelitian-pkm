import { EditOutlined } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProfPict } from 'state';
import * as yup from 'yup';

const ProfileCard = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isEditProfPict, setIsEditProfPict] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isOpenSnackbarPass, setIsOpenSnackbarPass] = useState(false);
  const [isOpenSnackbarPassFalse, setIsOpenSnackbarPassFalse] = useState(false);
  const [isOpenSnackbarPict, setIsOpenSnackbarPict] = useState(false);
  const handleCloseSnackPass = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSnackbarPass(false);
  };
  const handleCloseSnackPassFalse = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSnackbarPassFalse(false);
  };
  const handleCloseSnackPict = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenSnackbarPict(false);
  };

  const handleChangePict = async (values, onSubmitProps) => {
    await changeProfPict(values, onSubmitProps);
  };

  const handlePasswordChange = async (values, onSubmitProps) => {
    await editPassword(values, onSubmitProps);
  };

  const editPassword = async (values, onSubmitProps) => {
    try {
      const response = await fetch('http://localhost:3001/user/password', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const messageResponse = await response.json();
      console.log(messageResponse);
      if (messageResponse.msg === 'invalid previous password') {
        setIsOpenSnackbarPassFalse(true);
        onSubmitProps.resetForm();
        return;
      }
      onSubmitProps.resetForm();
      setIsOpenSnackbarPass(true);
      setIsChangePassword(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const changeProfPict = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      formData.append('userImage', values['picture']);
      const response = await fetch(`http://localhost:3001/user/image`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const responseMessage = await response.json();
      if (responseMessage) {
        setIsEditProfPict(false);
        setIsOpenSnackbarPict(true);
        dispatch(
          setEditProfPict({
            profilePicture: responseMessage.profilePicture,
            profilePictureId: responseMessage.profilePictureId,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box display='grid' sx={{ gridColumn: 'span 6' }}>
        <Card
          variant='outlined'
          sx={{
            height: isEditProfPict || isChangePassword ? '554px' : '350px',
            width: '300px',
          }}
        >
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Avatar
                src={user.profilePicture}
                sx={{
                  height: 140,
                  mb: 2,
                  width: 140,
                }}
              />
              <Typography gutterBottom variant='h5'>
                {user.name}
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                {user.nip}
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                {user.academicPosition ? user.academicPosition : user.role}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          {isEditProfPict && (
            <>
              <CardActions>
                <Box width={'100%'}>
                  <Formik
                    onSubmit={handleChangePict}
                    initialValues={{ picture: '' }}
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
                          width='100%'
                          border={`1px solid ${theme.palette.neutral.medium}`}
                          borderRadius='5px'
                          p='1rem'
                        >
                          <Dropzone
                            acceptedFiles='.jpg,.jpeg,.png'
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                              setFieldValue('picture', acceptedFiles[0])
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <Box
                                {...getRootProps()}
                                border={`2px dashed ${theme.palette.primary.main}`}
                                p='1rem'
                                sx={{ '&:hover': { cursor: 'pointer' } }}
                              >
                                <input {...getInputProps()} />
                                {!values.picture ? (
                                  <p>Upload Gambar</p>
                                ) : (
                                  <FlexBetween>
                                    <Typography>
                                      {values.picture.name}
                                    </Typography>
                                    <EditOutlined />
                                  </FlexBetween>
                                )}
                              </Box>
                            )}
                          </Dropzone>
                        </Box>
                        <Button
                          fullWidth
                          type='submit'
                          sx={{
                            m: '1rem 0',
                            p: '0.5rem',
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.alt,
                            '&:hover': { color: theme.palette.primary.main },
                          }}
                        >
                          Ubah Foto
                        </Button>
                      </form>
                    )}
                  </Formik>
                </Box>
              </CardActions>
            </>
          )}
          <CardActions>
            <Button
              fullWidth
              variant='text'
              color={!isEditProfPict ? 'primary' : 'error'}
              onClick={() => {
                setIsEditProfPict(!isEditProfPict);
                if (isChangePassword && !isEditProfPict) {
                  setIsChangePassword(false);
                }
              }}
            >
              {!isEditProfPict ? 'Ganti Foto Profil' : 'Batal'}
            </Button>
          </CardActions>
          <Divider />
          {isChangePassword && (
            <CardActions>
              <Box width='100%'>
                <Formik
                  onSubmit={handlePasswordChange}
                  initialValues={{ prevPassword: '', newPassword: '' }}
                  validationSchema={yup.object().shape({
                    prevPassword: yup
                      .string()
                      .required('This field is required'),
                    newPassword: yup
                      .string()
                      .required('This field is required'),
                  })}
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
                      <TextField
                        fullWidth
                        variant='filled'
                        type='password'
                        label='Password Sebelumnya'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.prevPassword}
                        name='prevPassword'
                        error={!!touched.prevPassword && !!errors.prevPassword}
                        helperText={touched.prevPassword && errors.prevPassword}
                        sx={{ gridColumn: 'span 6', m: '10px 0' }}
                      />
                      <TextField
                        fullWidth
                        variant='filled'
                        type='password'
                        label='Password Baru'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.newPassword}
                        name='newPassword'
                        error={!!touched.newPassword && !!errors.newPassword}
                        helperText={touched.newPassword && errors.newPassword}
                        sx={{ gridColumn: 'span 6', my: '10px' }}
                      />
                      <Button
                        fullWidth
                        type='submit'
                        sx={{
                          m: '0.1rem 0',
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.background.alt,
                          '&:hover': { color: theme.palette.primary.main },
                        }}
                      >
                        Ubah Password
                      </Button>
                    </form>
                  )}
                </Formik>
              </Box>
            </CardActions>
          )}
          <CardActions>
            <Button
              fullWidth
              variant='text'
              color={!isChangePassword ? 'primary' : 'error'}
              onClick={() => {
                setIsChangePassword(!isChangePassword);
                if (isEditProfPict && !isChangePassword) {
                  setIsEditProfPict(false);
                }
              }}
            >
              {!isChangePassword ? 'Ubah Password' : 'Batal'}
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Snackbar
        open={isOpenSnackbarPassFalse}
        autoHideDuration={5000}
        onClose={handleCloseSnackPassFalse}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackPassFalse}
          severity='error'
          sx={{ width: '100%' }}
        >
          Password Sebelumnya Salah!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isOpenSnackbarPass}
        autoHideDuration={5000}
        onClose={handleCloseSnackPass}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackPass}
          severity='success'
          sx={{ width: '100%' }}
        >
          Password Berhasil Diperbarui!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isOpenSnackbarPict}
        autoHideDuration={5000}
        onClose={handleCloseSnackPict}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackPict}
          severity='success'
          sx={{ width: '100%' }}
        >
          Foto Profil Berhasil Diubah!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileCard;
