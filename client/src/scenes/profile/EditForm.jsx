import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { setEditProfile } from 'state';

const EditForm = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [dateValue, setDateValue] = useState(user.dateOfBirth);
  const initialValues = {
    name: user.name,
    email: user.email,
    role: user.role,
    nip: user.nip,
    phone: user.phone,
    academicPosition: user.academicPosition,
    expertField: user.expertField.toString(),
  };

  const editProfile = async (values, onSubmitProps) => {
    try {
      const response = await fetch('http://localhost:3001/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      onSubmitProps.resetForm();
      setOpen(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // let year = dayjs(dateValue).get('year');
    // let month = dayjs(dateValue).get('month');
    // let date = dayjs(dateValue).get('date') + 1;
    // values.dateOfBirth = new Date(year, month, date);
    // values.expertField = values.expertField.split(',');
    await editProfile(
      {
        name: values.name,
        email: values.email,
        role: values.role,
        nip: values.nip,
        phone: values.phone,
        academicPosition: values.academicPosition,
        dateOfBirth: new Date(
          dayjs(dateValue).get('year'),
          dayjs(dateValue).get('month'),
          dayjs(dateValue).get('date') + 1
        ),
        expertField: values.expertField.split(','),
      },
      onSubmitProps
    );
    const newUser = {
      _id: user._id,
      name: values.name,
      email: values.email,
      role: values.role,
      nip: values.nip,
      phone: values.phone,
      academicPosition: values.academicPosition,
      dateOfBirth: new Date(
        dayjs(dateValue).get('year'),
        dayjs(dateValue).get('month'),
        dayjs(dateValue).get('date') + 1
      ),
      profilePicture: user.profilePicture,
      profilePictureId: user.profilePictureId,
      expertField: values.expertField.split(','),
    };
    console.log(values);
    dispatch(
      setEditProfile({
        user: newUser,
      })
    );
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    role: yup.string().required('required'),
    nip: yup.string().required('required'),
    phone: yup.string().required('required'),
    academicPosition: yup.string().required('required'),
    expertField: yup.string().required('required'),
  });

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
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              width={'61vw'}
              // gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 12' },
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 6' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 6' }}
              />
              <TextField
                fullWidth
                select
                variant='filled'
                type='text'
                label='Role'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name='role'
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: 'span 6' }}
              >
                <MenuItem key={1} value='Dosen'>
                  Dosen
                </MenuItem>
                <MenuItem key={2} value='LPPM'>
                  LPPM
                </MenuItem>
              </TextField>
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='NIP'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nip}
                name='nip'
                error={!!touched.nip && !!errors.nip}
                helperText={touched.nip && errors.nip}
                sx={{ gridColumn: 'span 6' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Phone'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name='phone'
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: 'span 6' }}
              />
              <DatePicker
                label='Tanggal Lahir'
                // defaultValue={dayjs(user.dateOfBirth)}
                defaultValue={dayjs(dateValue)}
                // value={values.dateOfBirth}
                onChange={(newValue) => setDateValue(newValue)}
                sx={{ gridColumn: 'span 6' }}
              />
              {values.role === 'Dosen' && (
                <TextField
                  fullWidth
                  select
                  variant='filled'
                  type='text'
                  label='Academic Position'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.academicPosition}
                  name='academicPosition'
                  error={
                    !!touched.academicPosition && !!errors.academicPosition
                  }
                  helperText={
                    touched.academicPosition && errors.academicPosition
                  }
                  sx={{ gridColumn: 'span 6' }}
                >
                  <MenuItem key={1} value='Guru Besar'>
                    Guru Besar
                  </MenuItem>
                  <MenuItem key={2} value='Lektor Kepala'>
                    Lektor Kepala
                  </MenuItem>
                  <MenuItem key={3} value='Lektor'>
                    Lektor
                  </MenuItem>
                  <MenuItem key={4} value='Asisten Ahli'>
                    Asisten Ahli
                  </MenuItem>
                  <MenuItem key={5} value='Tenaga Pengajar'>
                    Tenaga Pengajar
                  </MenuItem>
                </TextField>
              )}
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Expert Field'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expertField}
                name='expertField'
                error={!!touched.expertField && !!errors.expertField}
                helperText={touched.expertField && errors.expertField}
                sx={{ gridColumn: 'span 6' }}
              />
              <Box sx={{ gridColumn: 'span 12' }} />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Update Data
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Data Berhasil Diperbarui!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditForm;
