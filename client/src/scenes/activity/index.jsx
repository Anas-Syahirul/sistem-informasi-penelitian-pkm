import { EditOutlined } from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ActivityList from './ActivityList';
import DetailActivity from './DetailActivity';
import Header from 'components/Header';

const Activity = () => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const [mode, setMode] = useState('showList');
  const [activity, setActivity] = useState(null);
  const [activities, setActivities] = useState(null);

  // const getMyActivities = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/activity/leaderId', {
  //       method: 'GET',
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await response.json();
  //     setMyActivities(data);
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // useEffect(() => {
  //   getMyActivities();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      field: 'activityType',
      headerName: 'Jenis Kegiatan',
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Judul',
      flex: 1,
    },
    {
      field: 'activityStatus',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'judul2',
      headerName: 'Judul 2',
      width: 120,
      renderCell: (params) => (
        <>
          <Typography>Hello</Typography>
          <Button
            startIcon={<EditOutlined />}
            onClick={() => handleButtonClick(params.row)}
            color='success'
            variant='contained'
          >
            Lihat Detail
          </Button>
          <Typography></Typography>
        </>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          startIcon={<EditOutlined />}
          onClick={() => handleButtonClick(params.row)}
          color='success'
          variant='contained'
        >
          Lihat Detail
        </Button>
      ),
    },
  ];

  const handleButtonClick = (activitys) => {
    // Handle button click for a specific row item
    // console.log(`Button clicked for ID ${id}`);
    console.log(activitys);
    // setActivity(activitys);
    // setMode('detail');
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='AKTIVITAS' subtitle='' />
      {mode === 'showList' && (
        <ActivityList
          mode={mode}
          setMode={setMode}
          activity={activity}
          setActivity={setActivity}
          activities={activities}
          setActivities={setActivities}
        />
      )}
      {mode === 'detail' && (
        <DetailActivity
          mode={mode}
          setMode={setMode}
          activity={activity}
          setActivity={setActivity}
        />
      )}
      {/* <Box
        mt='40px'
        height='75vh'
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
        <DataGrid
          // loading={isLoading || !data}() => 'auto'
          // getRowHeight={() => 'auto'}
          getRowId={(row) => row._id}
          rows={myActivities || []}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box> */}
    </Box>
  );
};

export default Activity;
