import Header from 'components/Header';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { Box, Button } from '@mui/material';
import { ArrowBackIosOutlined } from '@mui/icons-material';

const EditAnnouncement = ({ mode, setMode, announcement, setAnnouncement }) => {
  const [dateValue, setDateValue] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
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
    activityTypeName: '',
    academicPositionRequired: {
      'Guru Besar': false,
      'Lektor Kepala': false,
      Lektor: false,
      'Asisten Ahli': false,
      'Tenaga Pengajar': false,
    },
    title: '',
    content: '',
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
    values['endDate'] = new Date(
      dayjs(endDate).get('year'),
      dayjs(endDate).get('month'),
      dayjs(endDate).get('date') + 1
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
        endDate: new Date(
          dayjs(endDate).get('year'),
          dayjs(endDate).get('month'),
          dayjs(endDate).get('date') + 1
        ),
      },
      onSubmitProps
    );
  };

  return (
    <>
      <Header title='Edit Pengumuman' subtitle='' />
      <Box display='flex' justifyContent='start' mt='10px'>
        <Button
          startIcon={<ArrowBackIosOutlined />}
          color='primary'
          variant='contained'
          // onClick={() => setMode('detail')}
        >
          Kembali
        </Button>
      </Box>
    </>
  );
};

export default EditAnnouncement;
