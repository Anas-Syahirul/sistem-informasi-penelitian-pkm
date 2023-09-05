import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import dayjs from 'dayjs';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Snackbar,
  TextField,
} from '@mui/material';
import { ArrowBackIosOutlined, SaveOutlined } from '@mui/icons-material';
import { Formik } from 'formik';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const EditAnnouncement = ({ mode, setMode, announcement, setAnnouncement }) => {
  const [dateValue, setDateValue] = useState(Date.now());
  const [monitoringDate, setMonitoringDate] = useState(Date.now());
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const initialValues = {
    activityTypeName: announcement.activityType,
    academicPositionRequired: {
      'Guru Besar':
        announcement.academicPositionRequired.includes('Guru Besar'),
      'Lektor Kepala':
        announcement.academicPositionRequired.includes('Lektor Kepala'),
      Lektor: announcement.academicPositionRequired.includes('Lektor'),
      'Asisten Ahli':
        announcement.academicPositionRequired.includes('Asisten Ahli'),
      'Tenaga Pengajar':
        announcement.academicPositionRequired.includes('Tenaga Pengajar'),
    },
    title: announcement.title,
    content: announcement.content,
  };

  const validationSchema = yup.object().shape({
    activityTypeName: yup.string().required('This field is required'),
    academicPositionRequired: yup.object().required('This field is required'),
    title: yup.string().required('This field is required'),
    content: yup.string().required('This field is required'),
  });

  const editAnnouncement = async (values, onSubmitProps) => {
    try {
      const response = await fetch(
        `http://localhost:3001/announcement/${announcement._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      console.log(data);
      // onSubmitProps.resetForm();
      // setOpenSnackbar(true);
      // setAnnouncement(data);
      // setMode('detail');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    values['proposalSubmisionDeadline'] = new Date(
      dayjs(dateValue).get('year'),
      dayjs(dateValue).get('month'),
      dayjs(dateValue).get('date') + 1
    );
    values['monitoringDate'] = new Date(
      dayjs(monitoringDate).get('year'),
      dayjs(monitoringDate).get('month'),
      dayjs(monitoringDate).get('date') + 1
    );
    values['userId'] = user._id;
    let acadPos = [];
    for (let position in values.academicPositionRequired) {
      if (values.academicPositionRequired[position] === true) {
        acadPos.push(position);
      }
    }
    values.academicPositionRequired = acadPos;
    console.log(values);
    await editAnnouncement(
      {
        activityTypeName: values.activityTypeName,
        title: values.title,
        academicPositionRequired: acadPos,
        content: values.content,
        proposalSubmisionDeadline: new Date(
          dayjs(dateValue).get('year'),
          dayjs(dateValue).get('month'),
          dayjs(dateValue).get('date') + 1
        ),
        monitoringDate: new Date(
          dayjs(monitoringDate).get('year'),
          dayjs(monitoringDate).get('month'),
          dayjs(monitoringDate).get('date') + 1
        ),
      },
      onSubmitProps
    );
    setMode('detail');
  };

  useEffect(() => {
    console.log(
      announcement.academicPositionRequired.includes('Lektor Kepala')
    );
  });

  return (
    <>
      <Header title='Edit Pengumuman' subtitle='' />
      <Box display='flex' justifyContent='start' mt='10px'>
        <Button
          startIcon={<ArrowBackIosOutlined />}
          color='primary'
          variant='contained'
          onClick={() => setMode('detail')}
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
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display='grid' gap='30px'>
                <TextField
                  fullWidth
                  select
                  variant='filled'
                  type='text'
                  label='Tipe Kegiatan'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.activityTypeName}
                  name='activityTypeName'
                  error={
                    !!touched.activityTypeName && !!errors.activityTypeName
                  }
                  helperText={
                    touched.activityTypeName && errors.activityTypeName
                  }
                  sx={{ gridColumn: 'span 6' }}
                >
                  <MenuItem key={1} value='Penelitian'>
                    Penelitian
                  </MenuItem>
                  <MenuItem key={2} value='PkM'>
                    PkM
                  </MenuItem>
                </TextField>
                <FormControl
                  component='fieldset'
                  variant='standard'
                  error={
                    !values.academicPositionRequired['Guru Besar'] &&
                    !values.academicPositionRequired['Lektor Kepala'] &&
                    !values.academicPositionRequired['Lektor'] &&
                    !values.academicPositionRequired['Asisten Ahli'] &&
                    !values.academicPositionRequired['Tenaga Pengajar']
                  }
                >
                  <FormLabel component='legend'>
                    Syarat Posisi Akademik{' '}
                    {!values.academicPositionRequired['Guru Besar'] &&
                    !values.academicPositionRequired['Lektor Kepala'] &&
                    !values.academicPositionRequired['Lektor'] &&
                    !values.academicPositionRequired['Asisten Ahli'] &&
                    !values.academicPositionRequired['Tenaga Pengajar']
                      ? '(Minimal terpilih satu)'
                      : ''}
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={announcement.academicPositionRequired.includes(
                            'Guru Besar'
                          )}
                          value={values.academicPositionRequired['Guru Besar']}
                          onChange={handleChange}
                          name='academicPositionRequired["Guru Besar"]'
                        />
                      }
                      label='Guru Besar'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={announcement.academicPositionRequired.includes(
                            'Lektor Kepala'
                          )}
                          value={
                            values.academicPositionRequired['Lektor Kepala']
                          }
                          onChange={handleChange}
                          name='academicPositionRequired["Lektor Kepala"]'
                        />
                      }
                      label='Lektor Kepala'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={announcement.academicPositionRequired.includes(
                            'Lektor'
                          )}
                          value={values.academicPositionRequired['Lektor']}
                          onChange={handleChange}
                          name='academicPositionRequired["Lektor"]'
                        />
                      }
                      label='Lektor'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={announcement.academicPositionRequired.includes(
                            'Asisten Ahli'
                          )}
                          value={
                            values.academicPositionRequired['Asisten Ahli']
                          }
                          onChange={handleChange}
                          name='academicPositionRequired["Asisten Ahli"]'
                        />
                      }
                      label='Asisten Ahli'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={announcement.academicPositionRequired.includes(
                            'Tenaga Pengajar'
                          )}
                          value={
                            values.academicPositionRequired['Tenaga Pengajar']
                          }
                          onChange={handleChange}
                          name='academicPositionRequired["Tenaga Pengajar"]'
                        />
                      }
                      label='Tenaga Pengajar'
                    />
                  </FormGroup>
                </FormControl>
                <TextField
                  fullWidth
                  variant='filled'
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
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  variant='filled'
                  type='text'
                  label='Deskripsi'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.content}
                  name='content'
                  error={!!touched.content && !!errors.content}
                  helperText={touched.content && errors.content}
                  sx={{ gridColumn: 'span 6' }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Batas Pengajuan Proposal'
                    defaultValue={dayjs(dateValue)}
                    onChange={(newValue) => setDateValue(newValue)}
                    sx={{ gridColumn: 'span 6', width: '15%' }}
                  />
                  <DatePicker
                    label='Waktu Pelaksanaan Monitoring'
                    defaultValue={dayjs(monitoringDate)}
                    onChange={(newValue) => setMonitoringDate(newValue)}
                    sx={{ gridColumn: 'span 6', width: '15%' }}
                  />
                </LocalizationProvider>
              </Box>
              <Box display='flex' justifyContent='end' mt='20px' mb='10px'>
                <Button
                  type='submit'
                  color='secondary'
                  variant='contained'
                  startIcon={<SaveOutlined />}
                >
                  Simpan Perubahan
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity='success'
            sx={{ width: '100%' }}
          >
            Berhasil Mengubah Detail Pengumuman
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default EditAnnouncement;
