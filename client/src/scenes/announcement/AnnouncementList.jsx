import {
  AddOutlined,
  EditOutlined,
  FileUploadOutlined,
  InfoOutlined,
} from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const AnnouncementList = ({
  mode,
  setMode,
  idAnnouncement,
  setIdAnnouncement,
  announcement,
  setAnnouncement,
  userAnnouncement,
  setUserAnnouncement,
}) => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const [announcements, setAnnouncements] = useState(null);
  const user = useSelector((state) => state.user);

  const columns = [
    {
      field: 'activityType',
      headerName: 'Jenis Kegiatan',
      flex: 0.3,
    },
    {
      field: 'title',
      headerName: 'Judul',
      flex: 1,
    },
    {
      field: 'proposalSubmisionDeadline',
      headerName: 'Batas Pengumpulan Proposal',
      flex: 1,
      renderCell: (params) => (
        <Typography>{`${dayjs(params.row.proposalSubmisionDeadline).get(
          'date'
        )}-${
          dayjs(params.row.proposalSubmisionDeadline).get('month') + 1
        }-${dayjs(params.row.proposalSubmisionDeadline).get(
          'year'
        )}`}</Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      renderCell: (params) => (
        <Button
          startIcon={<InfoOutlined />}
          onClick={() => handleButtonClick(params.row)}
          color='success'
          variant='contained'
        >
          Lihat Detail
        </Button>
      ),
    },
  ];

  const handleButtonClick = (id) => {
    // Handle button click for a specific row item
    console.log(`Button clicked for ID ${id}`);
    setAnnouncement(id);
    // setIdAnnouncement(id);
    setMode('detail');
  };

  const getAnnouncements = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/announcement/active',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setAnnouncements(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAnnouncements();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header title='Daftar Pengumuman' subtitle='' />
      <Box
        mt='40px'
        height='75vh'
        width='80vw'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {user.role === 'LPPM' && (
          <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
            <Button
              type='submit'
              color='secondary'
              variant='contained'
              onClick={() => setMode('create')}
              startIcon={<FileUploadOutlined />}
            >
              Upload Pengumuman
            </Button>
          </Box>
        )}
        <DataGrid
          // loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={announcements || []}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </>
  );
};

export default AnnouncementList;
