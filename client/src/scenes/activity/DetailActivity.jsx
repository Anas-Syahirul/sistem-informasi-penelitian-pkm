import {
  AddTaskOutlined,
  ArrowBackIosOutlined,
  CancelOutlined,
  CloudUploadOutlined,
  EditOutlined,
  RateReviewOutlined,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import dayjs from 'dayjs';

const DetailActivity = ({ mode, setMode, activity, setActivity }) => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const [leader, setLeader] = useState(null);
  const [member, setMember] = useState([]);
  const [reviewer, setReviewer] = useState([]);
  const [isAddReviewer, setIsAddReviewer] = useState(false);
  const [fieldValues, setFieldValues] = useState(['']);
  const [lectName, setLectName] = useState(null);
  const [isSubmitFinalReport, setIsSubmitFinalReport] = useState(false);
  const [isSubmitProposalRevision, setIsSubmitProposalRevision] =
    useState(false);
  const [isAddMonitoringNote, setIsAddMonitoringNote] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  const getAllDosenName = async () => {
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

  const addReviewer = async (values) => {
    try {
      // const formData = new FormData();
      // formData.append('reviewerName', values);
      const response = await fetch(
        `http://localhost:3001/activity/reviewer/${activity._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reviewerName: values }),
          // body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      // setOpenSnackbar(true);
      // setMode('showList');
      setIsAddReviewer(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addFinalReport = async (values, onSubmitProps) => {
    try {
      console.log(values);
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      console.log(formData.member);
      const response = await fetch(
        `http://localhost:3001/activity/final-report/${activity._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      onSubmitProps.resetForm();
      setIsSubmitFinalReport(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateProposal = async (values, onSubmitProps) => {
    try {
      console.log(values);
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      console.log(formData.member);
      const response = await fetch(
        `http://localhost:3001/activity/proposal-revision/${activity._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      onSubmitProps.resetForm();
      setIsSubmitProposalRevision(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateMonitoringNote = async (values, onSubmitProps) => {
    try {
      const response = await fetch(
        `http://localhost:3001/activity/monitoringNote/${activity._id}`,
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
      setIsAddMonitoringNote(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmitFinalReport = async (values, onSubmitProps) => {
    await addFinalReport(values, onSubmitProps);
  };

  const handleSubmitProposalRevision = async (values, onSubmitProps) => {
    await updateProposal(values, onSubmitProps);
  };

  const handleSubmitMonitoringNote = async (values, onSubmitProps) => {
    await updateMonitoringNote(values, onSubmitProps);
  };

  const updateFieldValue = (index, value) => {
    const updatedValues = [...fieldValues];
    updatedValues[index] = value;
    setFieldValues(updatedValues);
    setLectName(lectName.filter((e) => e !== value));
  };

  useEffect(() => {
    // getDetailActivity()
    getAllDosenName().then((value) => setLectName(value));
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
    // console.log(activity.reviewer);
  }, [activity]); // eslint-disable-line react-hooks/exhaustive-deps

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
              <TableCell width='10%' sx={{ width: '30%' }}>
                Karya
              </TableCell>
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
              <TableCell>
                {reviewer ? reviewer : 'Belum ada reviewer'}
              </TableCell>
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
              <>
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
                <TableRow>
                  <TableCell width='30%'>Waktu Monitoring</TableCell>
                  <TableCell width='70%'>
                    <Typography>
                      {activity ? activity.monitoringDate.slice(0, 10) : ''}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width='30%'>Catatan Monitoring</TableCell>
                  <TableCell width='70%'>
                    <Typography>
                      <pre style={{ fontFamily: 'inherit' }}>
                        {activity ? activity.monitoringNote : ''}
                      </pre>
                    </Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
            {activity.activityStatus === 'revisi proposal' && (
              <TableRow>
                <TableCell width='30%'>Catatan Revisi Proposal</TableCell>
                <TableCell width='70%'>
                  <Typography>
                    <pre style={{ fontFamily: 'inherit' }}>
                      {activity ? activity.proposalRevisionNote : ''}
                    </pre>
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {activity.activityStatus === 'revisi proposal' && (
        <Box my='20px'>
          <Button
            color='info'
            variant='contained'
            startIcon={
              !isSubmitProposalRevision ? <CloudUploadOutlined /> : undefined
            }
            onClick={() =>
              setIsSubmitProposalRevision(!isSubmitProposalRevision)
            }
          >
            {!isSubmitProposalRevision ? 'Upload Revisi Proposal' : 'Batal'}
          </Button>
        </Box>
      )}
      {isSubmitProposalRevision &&
        activity.activityStatus === 'revisi proposal' && (
          <Formik
            onSubmit={handleSubmitProposalRevision}
            initialValues={{ proposalFile: '' }}
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
                  my='20px'
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
                          <p>Add Proposal Revision Here</p>
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
                <Box display='flex' justifyContent='start'>
                  <Button
                    type='submit'
                    sx={{
                      m: '1rem 1rem',
                      p: '0.5rem',
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.alt,
                      '&:hover': { color: theme.palette.primary.main },
                    }}
                  >
                    Submit Revisi Proposal
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        )}
      {!isSubmitFinalReport &&
        activity.activityStatus === 'pelaksanaan' &&
        user.role === 'Dosen' && (
          <Box my='20px'>
            <Button
              color='info'
              variant='contained'
              startIcon={<CloudUploadOutlined />}
              onClick={() => setIsSubmitFinalReport(true)}
            >
              Submit Laporan Akhir
            </Button>
          </Box>
        )}

      {user.role === 'LPPM' &&
        !isAddReviewer &&
        activity.reviewer.length === 0 && (
          <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
            <Button
              startIcon={<RateReviewOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                getAllDosenName();
                setIsAddReviewer(true);
              }}
            >
              Tambah Reviewer
            </Button>
          </Box>
        )}

      {isAddReviewer &&
        Array.from({ length: 2 }, (_, index) => (
          <Autocomplete
            sx={{ width: '30%' }}
            key={index}
            options={lectName ? lectName : ['option1', 'option2']}
            value={fieldValues[index]}
            onChange={(e, value) => updateFieldValue(index, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Reviewer ${index + 1}`}
                variant='outlined'
                style={{ marginTop: '16px' }}
              />
            )}
          />
        ))}
      {isAddReviewer && (
        <Box
          sx={{
            width: '30%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
            <Button
              startIcon={<CancelOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                setIsAddReviewer(false);
              }}
            >
              Batal
            </Button>
          </Box>
          <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
            <Button
              startIcon={<AddTaskOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                addReviewer(fieldValues);
                setIsAddReviewer(false);
              }}
            >
              Tambah Reviewer
            </Button>
          </Box>

          {/* {isAddReviewer && (
          <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
            <Button
              startIcon={<AddTaskOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                addReviewer(fieldValues);
                setIsAddReviewer(false);
              }}
            >
              Tambah Reviewer
            </Button>
          </Box>
        )}
        {isAddReviewer && (
          <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
            <Button
              startIcon={<AddTaskOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                addReviewer(fieldValues);
                setIsAddReviewer(false);
              }}
            >
              Tambah Reviewer
            </Button>
          </Box>
        )} */}
        </Box>
      )}
      {activity.monitoringNote === '' &&
        dayjs().isAfter(dayjs(activity.monitoringDate)) &&
        user.role === 'LPPM' &&
        !isAddMonitoringNote && (
          <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
            <Button
              startIcon={<RateReviewOutlined />}
              color='secondary'
              variant='contained'
              onClick={() => {
                setIsAddMonitoringNote(true);
              }}
            >
              Tambahkan Catatan Monitoring
            </Button>
          </Box>
        )}
      {isAddMonitoringNote && (
        <Formik
          onSubmit={handleSubmitMonitoringNote}
          initialValues={{ monitoringNote: '' }}
          validationSchema={yup.object().shape({
            monitoringNote: yup
              .string()
              .required('Catatan Monitoring harus diisi'),
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
                my='20px'
              >
                <TextField
                  fullWidth
                  multiline
                  rows={7}
                  variant='filled'
                  type='text'
                  label='Catatan Hasil Monitoring'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.monitoringNote}
                  name='monitoringNote'
                  error={!!touched.monitoringNote && !!errors.monitoringNote}
                  helperText={touched.monitoringNote && errors.monitoringNote}
                  sx={{ gridColumn: 'span 6' }}
                />
              </Box>
              <FlexBetween>
                <Button
                  onClick={() => setIsAddMonitoringNote(false)}
                  sx={{
                    m: '1rem',
                    p: '0.5rem',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  Batal
                </Button>
                <Button
                  type='submit'
                  sx={{
                    m: '1rem',
                    p: '0.5rem',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  Kirim Catatan Monitoring
                </Button>
              </FlexBetween>
            </form>
          )}
        </Formik>
      )}
      {isSubmitFinalReport && (
        <Formik
          onSubmit={handleSubmitFinalReport}
          initialValues={{ finalReport: '' }}
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
                my='20px'
              >
                <Dropzone
                  acceptedFiles='.pdf'
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue('finalReport', acceptedFiles[0])
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
                      {!values.finalReport ? (
                        <p>Upload Laporan Akhir</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.finalReport.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
              <FlexBetween>
                <Button
                  onClick={() => setIsSubmitFinalReport(false)}
                  sx={{
                    m: '1rem',
                    p: '0.5rem',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  Batal
                </Button>
                <Button
                  type='submit'
                  sx={{
                    m: '1rem',
                    p: '0.5rem',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  Submit Laporan Akhir
                </Button>
              </FlexBetween>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default DetailActivity;
