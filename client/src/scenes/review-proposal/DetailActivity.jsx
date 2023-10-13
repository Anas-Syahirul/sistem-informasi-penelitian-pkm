import { useTheme } from '@emotion/react';
import {
  ArrowBackIosOutlined,
  DoneAllOutlined,
  GppBadOutlined,
  PendingActionsOutlined,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useSelector } from 'react-redux';

const DetailActivity = ({ mode, setMode, activity, setActivity }) => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const [leader, setLeader] = useState(null);
  const [member, setMember] = useState([]);
  const [reviewer, setReviewer] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [isRevision, setIsrevision] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const getUserName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      await response.json().then((value) => {
        setLeader(value);
      });
      // console.log(announcement);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateStatusActivity = async (statusName) => {
    try {
      const response = await fetch(
        `http://localhost:3001/activity/status/${activity._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: statusName }),
        }
      );
      const data = await response.json();
      console.log(data);
      // onSubmitProps.resetForm();
      // setOpenSnackbar(true);
      setMode('showList');
    } catch (err) {
      console.log(err.message);
    }
  };

  const addRevision = async (values, onSubmitProps) => {
    try {
      const response = await fetch(
        `http://localhost:3001/activity//status-revision/${activity._id}`,
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
      onSubmitProps.resetForm();
      setMode('showList');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFormRevision = async (values, onSubmitProps) => {
    await addRevision(values, onSubmitProps);
    setIsrevision(false);
  };

  useEffect(() => {
    let memberName = [];
    for (let i = 0; i < activity.member.length; i++) {
      const val = activity.member[i];
      memberName.push(val.name);
    }
    setMember(memberName.toString());
    let reviewerName = [];
    for (let i = 0; i < activity.reviewer.length; i++) {
      const val = activity.reviewer[i];
      reviewerName.push(val.name);
    }
    setReviewer(reviewerName.toString());

    getUserName(activity.leader._id);
  }, [activity]);

  return (
    <>
      <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
        <Button
          startIcon={<ArrowBackIosOutlined />}
          color='secondary'
          variant='contained'
          onClick={() => {
            setMode('showList');
            setActivity(null);
          }}
        >
          Kembali
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width='10%' sx={{ width: '30%' }}></TableCell>
              <TableCell width='90%'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell width='30%'>Title</TableCell>
              <TableCell width='70%'>
                {activity ? activity.title : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='30%'>Ketua</TableCell>
              <TableCell width='70%'>{leader ? leader.name : ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='30%'>Anggota</TableCell>
              <TableCell width='70%'>{member ? member : ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reviewer</TableCell>
              <TableCell>{reviewer ? reviewer : ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='30%'>Status</TableCell>
              <TableCell width='70%'>
                {activity ? activity.activityStatus : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='30%'>Proposal</TableCell>
              <TableCell width='70%'>
                <Typography>
                  <Link
                    href={activity.proposalUrl}
                    target='_blank'
                    rel='noopener'
                  >
                    Dokumen Proposal
                  </Link>
                </Typography>
              </TableCell>
            </TableRow>
            {activity.activityStatus === 'pelaksanaan' && (
              <TableRow>
                <TableCell width='30%'>Surat Penugasan</TableCell>
                <TableCell width='70%'>
                  <Typography>
                    <Link
                      href={activity.proposalUrl}
                      target='_blank'
                      rel='noopener'
                    >
                      Dokumen Surat Penugasan
                    </Link>
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Box
        display='flex'
        justifyContent='start'
        alignItems='center'
        gap='30px'
        my='20px'
      >
        {activity.activityStatus === 'review proposal' && (
          <Button
            color='error'
            variant='contained'
            startIcon={<GppBadOutlined />}
            onClick={() => updateStatusActivity('proposal ditolak')}
          >
            Tolak Proposal
          </Button>
        )}
        {activity.activityStatus === 'review proposal' && (
          <Button
            color='info'
            variant='contained'
            startIcon={<PendingActionsOutlined />}
            onClick={() => {
              setIsrevision(!isRevision);
              // updateStatusActivity('revisi proposal')
            }}
          >
            {!isRevision ? 'Ajukan Revisi' : 'Batal'}
          </Button>
        )}
        {activity.activityStatus === 'review proposal' ||
        activity.activityStatus === 'pengumpulan revisi' ? (
          <Button
            color='success'
            variant='contained'
            startIcon={<DoneAllOutlined />}
            onClick={() => updateStatusActivity('proposal disetujui')}
          >
            Setujui Proposal
          </Button>
        ) : (
          <></>
        )}
      </Box>
      {isRevision && (
        <Formik
          onSubmit={handleFormRevision}
          initialValues={{ revisionNote: '' }}
          validationSchema={yup.object().shape({
            revisionNote: yup.string().required('This field is required'),
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
              <Box
                width='100%'
                border={`1px solid ${theme.palette.neutral.medium}`}
                borderRadius='5px'
                p='1rem'
              >
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  variant='filled'
                  type='text'
                  label='Catatan revisi'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.revisionNote}
                  name='revisionNote'
                  error={!!touched.revisionNote && !!errors.revisionNote}
                  helperText={touched.revisionNote && errors.revisionNote}
                  sx={{ gridColumn: 'span 6' }}
                />
              </Box>
              <Button
                type='submit'
                sx={{
                  m: '0.5rem 1rem',
                  p: '0.5rem',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.alt,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Ajukan Revisi
              </Button>
            </form>
          )}
        </Formik>
      )}

      {/* <div>
        <Document
          file='https://res.cloudinary.com/dt9mpchlg/image/upload/v1687311542/proposal-file/bz3olos2rpeujcrod5qb.pdf' // Replace with your PDF link
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <Typography>
          Page {pageNumber} of {numPages}
        </Typography>
      </div> */}
      {/* <PDFViewer
        document={{
          url: 'https://res.cloudinary.com/dt9mpchlg/image/upload/v1687311542/proposal-file/bz3olos2rpeujcrod5qb.pdf',
        }}
      /> */}
      {/* <Snackbar
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
            {activity.activityType} 
          </Alert>
        </Snackbar> */}
    </>
  );
};

export default DetailActivity;
