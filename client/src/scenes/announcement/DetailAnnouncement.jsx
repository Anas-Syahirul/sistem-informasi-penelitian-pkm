import {
  AppRegistrationOutlined,
  ArrowBackIosOutlined,
  EditOutlined,
  ForwardToInboxOutlined,
  PublishOutlined,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Header from 'components/Header';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DetailAnnouncement = ({
  mode,
  setMode,
  idAnnouncement,
  setIdAnnouncement,
  announcement,
  setAnnouncement,
  userAnnouncement,
  setUserAnnouncement,
}) => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [countUnFinishedReviewActivity, setCountUnFinishedReviewActivity] =
    useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // const useStyles = makeStyles({
  //   input: {
  //     color: 'inherit', // Set the color to inherit from the parent element
  //   },
  // });

  // const classes = useStyles();

  const getUserName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      await response.json().then((value) => {
        setUserAnnouncement(value);
      });
      console.log(announcement);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUnFinishedReviewActivity = async (announcementId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/activity/count/idAnnounce/${announcementId}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await response.json().then((value) => {
        setCountUnFinishedReviewActivity(value);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getDetailAnnouncement = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/announcement/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      await response.json().then((value) => {
        setAnnouncement(value);
      });
      console.log(announcement);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (idAnnouncement) {
      getDetailAnnouncement(idAnnouncement);
    }
  }, [idAnnouncement]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getUnFinishedReviewActivity(announcement._id);
    if (announcement) {
      getUserName(announcement.postedBy);
    }
  }, [announcement]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
        <Button
          startIcon={<ArrowBackIosOutlined />}
          color='secondary'
          variant='contained'
          onClick={() => {
            setMode('showList');
            setAnnouncement(null);
            setIdAnnouncement(null);
          }}
        >
          Kembali
        </Button>
      </Box>
      <Header title='Detail Pengumuman' subtitle='.' />
      <Typography variant='h3' gutterBottom my='10px'>
        {announcement ? announcement.title : ''}
      </Typography>

      <Typography variant='subtitle1' gutterBottom>
        Posted By: {userAnnouncement ? userAnnouncement.name : ''}
      </Typography>

      <Typography variant='subtitle1' gutterBottom>
        Tag :{' '}
        <Chip
          label={announcement ? announcement.activityType : ''}
          variant='outlined'
        />
      </Typography>

      {/* <Typography variant='subtitle2' gutterBottom>
        Program Date: {announcement.programDate}
      </Typography>*/}
      <TextField
        fullWidth
        multiline
        // rows={20}
        maxRows={20}
        variant='filled'
        type='text'
        value={announcement ? announcement.content : ''}
        name='content'
        color='inherit'
        sx={{ gridColumn: 'span 6' }}
        InputProps={{ readOnly: true }}
      />

      {/* <Paper
        elevation={1}
        style={{
          padding: '16px',
          marginTop: '16px',
          textAlign: 'justify',
          width: '60vw',
          maxWidth: '100%',
          overflow: 'auto',
        }}
      >
        <Container fixed>
          <Box>
                        <Typography variant='h5' maxWidth='100%'>
              <pre
                style={{ fontFamily: 'inherit', margin: 0, maxWidth: '100%' }}
              >
                {announcement ? announcement.content : ''}
              </pre>
            </Typography>
          </Box>
        </Container>
      </Paper> */}
      {/* 
      <div style={{ marginTop: '16px' }}>
      <Typography variant='subtitle2' gutterBottom>
      Keywords:
      </Typography>
      
      {announcement.keywords.map((keyword, index) => (
        <Chip
        key={index}
        label={keyword}
        variant='outlined'
        style={{ marginRight: '8px' }}
        />
        ))}
      </div> */}
      <Box display='flex' justifyContent='start' mt='20px' mb='20px' gap='30px'>
        {dayjs().isBefore(dayjs(announcement.proposalSubmisionDeadline)) &&
          user.role === 'Dosen' && (
            <Button
              startIcon={<AppRegistrationOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                setMode('register');
              }}
            >
              Daftar
            </Button>
          )}
        {user.role === 'LPPM' && (
          <>
            <Button
              startIcon={<EditOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                setMode('edit');
              }}
            >
              Edit
            </Button>
            <Button
              startIcon={<ForwardToInboxOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                if (countUnFinishedReviewActivity === 0) {
                  setMode('surat-tugas');
                } else {
                  setOpenSnackbar(true);
                }
              }}
            >
              Terbitkan Surat Penugasan
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={5000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity='warning'
                sx={{ width: '100%' }}
              >
                Proses Review Proposal belum selesai. Masih Terdapat{' '}
                {countUnFinishedReviewActivity} {announcement.activityType} yang
                belum selesai di-review
              </Alert>
            </Snackbar>
          </>
        )}
      </Box>
    </div>
  );
  // return (
  //   <>
  //     <Box mt='40px' height='75vh'>

  //     </Box>
  //   </>
  // );
};

export default DetailAnnouncement;
