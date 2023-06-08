import React from 'react';
import { useSelector } from 'react-redux';
import Formik from 'formik';
import { Box, TextField } from '@mui/material';
import * as yup from 'yup';

const AccountProfileDetails = () => {
  const user = useSelector((state) => state.global.user);
  const initialValues = {
    username: user.username,
    email: user.email,
    role: user.role,
    nip: user.nip,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
    academicPosition: user.academicPosition,
    expertField: user.expertField,
  };
  const editProfileSchema = yup.object().shape({
    username: yup.string().required('required'),
    email: yup.string().email('invalid email format').required('required'),
    role: yup.string().required('required'),
    nip: yup.string().required('required'),
    phone: yup.string().required('required'),
    dateOfBirth: yup.string().required('required'),
    academicPosition: yup.string().required('required'),
    expertField: yup.string().required('required'),
  });

  const editProfile = async (values, onSubmitProps) => {
    try {
      const editResponse = await fetch('http://localhost:3001/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const edited = await editResponse.json();
      onSubmitProps.resetForm();
      // if (edited) {
      // }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await editProfile(values, onSubmitProps);
  };

  // const
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={editProfileSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { undefined },
            }}
          >
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name='firstName'
              error={!!touched.username && !!errors.username}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='firstName'
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.role}
              name='firstName'
              error={!!touched.role && !!errors.role}
              helperText={touched.role && errors.role}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='firstName'
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nip}
              name='firstName'
              error={!!touched.nip && !!errors.nip}
              helperText={touched.nip && errors.nip}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              name='firstName'
              error={!!touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.dateOfBirth}
              name='firstName'
              error={!!touched.dateOfBirth && !!errors.dateOfBirth}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.academicPosition}
              name='firstName'
              error={!!touched.academicPosition && !!errors.academicPosition}
              helperText={touched.academicPosition && errors.academicPosition}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='First Name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.expertField}
              name='firstName'
              error={!!touched.expertField && !!errors.expertField}
              helperText={touched.expertField && errors.expertField}
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AccountProfileDetails;
