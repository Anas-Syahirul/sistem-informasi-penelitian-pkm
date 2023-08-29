import { EditOutlined } from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import { Formik } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';

const SuratTugas = ({ announcement, setAnnouncement, mode, setMode }) => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const publishSuratTugas = async (values) => {
    try {
      console.log(values);
      const formData = new FormData();
      formData.append('username', user.name);
      for (let value in values) {
        formData.append(value, values[value]);
      }
      const response = await fetch(
        `http://localhost:3001/letter-of-assignment/${announcement._id}`,
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
      if (data.uploader) {
        setMode('detail');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlePublishSuratTugas = async (values) => {
    await publishSuratTugas(values);
  };

  return (
    <div>
      <Header
        title='Penerbitan Surat Penugasan'
        subtitle={announcement.title}
      />
      <Formik
        onSubmit={handlePublishSuratTugas}
        initialValues={{ letterOfAssignment: '' }}
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
                  setFieldValue('letterOfAssignment', acceptedFiles[0])
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
                    {!values.letterOfAssignment ? (
                      <p>Upload Surat Penugasan</p>
                    ) : (
                      <FlexBetween>
                        <Typography>
                          {values.letterOfAssignment.name}
                        </Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
            <FlexBetween>
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
                Terbitkan Surat Penugasan
              </Button>
            </FlexBetween>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SuratTugas;
