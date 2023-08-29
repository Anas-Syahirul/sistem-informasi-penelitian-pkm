import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';
import { ArrowBackIosOutlined, EditOutlined } from '@mui/icons-material';

const Register = ({ announcement, idAnnouncement, mode, setMode }) => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [lectName, setLectName] = useState(null);
  const [numFields, setNumFields] = useState(1);
  const [fieldValues, setFieldValues] = useState(['']);

  const addField = () => {
    setNumFields(numFields + 1);
    setFieldValues([...fieldValues, '']);
  };

  const removeField = () => {
    if (numFields > 1) {
      setNumFields(numFields - 1);
      setFieldValues(fieldValues.slice(0, -1));
    }
  };

  const updateFieldValue = (index, value) => {
    const updatedValues = [...fieldValues];
    updatedValues[index] = value;
    setFieldValues(updatedValues);
    setLectName(lectName.filter((e) => e !== value));
  };

  const getAllUserName = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/name', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await response.json().then((value) => {
        setLectName(value);
        console.log(value);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const register = async (values, onSubmitProps) => {
    try {
      console.log(values);
      const formData = new FormData();
      for (let value in values) {
        // if (value !== 'proposalFile') {
        // }
        formData.append(value, values[value]);
      }
      // formData.append('member', fieldValues);
      console.log(formData.member);
      // formData.append('announcementId', announcement.activityType)
      // formData.append('proposalFile', values['proposalFile']);
      console.log(announcement._id);
      const response = await fetch(
        `http://localhost:3001/activity/${announcement._id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      onSubmitProps.resetForm();
      setMode('showList');
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllUserName();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initialValues = {
    title: '',
    proposal: '',
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('This field is required'),
  });

  const handleFormSubmit = async (values, onSubmitProps) => {
    values['member'] = fieldValues;
    values['leaderName'] = user.name;
    await register(values, onSubmitProps);
    // console.log(values);
  };

  return (
    <>
      <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
        <Button
          startIcon={<ArrowBackIosOutlined />}
          color='secondary'
          variant='contained'
          onClick={() => {
            setMode('detail');
          }}
        >
          Kembali
        </Button>
      </Box>

      <Box mt='40px' height='75vh'>
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
              <Box display='grid' gap='30px'>
                <TextField
                  fullWidth
                  variant='outlined'
                  type='text'
                  label='Title'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name='title'
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: 'span 6' }}
                />
                <div>
                  <Button
                    variant='contained'
                    onClick={addField}
                    sx={{ mr: '10px' }}
                  >
                    Tambah Jumlah Anggota
                  </Button>

                  <Button
                    variant='contained'
                    onClick={removeField}
                    disabled={numFields === 1}
                  >
                    Hapus Anggota
                  </Button>

                  {Array.from({ length: numFields }, (_, index) => (
                    <Autocomplete
                      key={index}
                      options={lectName ? lectName : ['option1', 'options']}
                      value={fieldValues[index]}
                      onChange={(e, value) => updateFieldValue(index, value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`Anggota ${index + 1}`}
                          variant='outlined'
                          style={{ marginTop: '16px' }}
                        />
                      )}
                    />
                  ))}
                </div>
              </Box>
              <Box
                width='100%'
                border={`1px solid ${theme.palette.neutral.medium}`}
                borderRadius='5px'
                p='1rem'
              >
                <Dropzone
                  // acceptedFiles='.jpg,.jpeg,.png'
                  acceptedFiles='.pdf'
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue('proposalFile', acceptedFiles[0])
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
                      {!values.proposalFile ? (
                        <p>Upload File Proposal</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.proposalFile.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
              <Box display='flex' justifyContent='end' mt='20px' mb='10px'>
                <Button type='submit' color='secondary' variant='contained'>
                  Register
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Register;
