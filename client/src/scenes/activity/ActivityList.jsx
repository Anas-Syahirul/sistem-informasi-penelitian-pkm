import { useTheme } from '@emotion/react';
import { EditOutlined, InfoOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ActivityList = ({
  mode,
  setMode,
  activity,
  setActivity,
  activities,
  setActivities,
}) => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const theme = useTheme();

  const getNullReviewerActivities = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/reviewer/nullReviewer',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setActivities(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getActivitiesDosen = async () => {
    try {
      const response = await fetch('http://localhost:3001/activity/leaderId', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setActivities(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleButtonClickDosen = (params) => {
    console.log(params);
    setActivity(params);
    setMode('detail');
  };

  useEffect(() => {
    if (user.role === 'Dosen') {
      getActivitiesDosen();
    } else {
      getNullReviewerActivities();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columnsDosen = [
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
      field: 'ketua',
      headerName: 'Ketua',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.leader.name}</Typography>,
    },
    {
      field: 'anggota',
      headerName: 'Anggota',
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {params.row.member.length > 0
            ? params.row.member[0].name
            : 'Tidak ada Anggota'}
          {params.row.member.length > 0 ? ', ...' : ''}
        </Typography>
      ),
    },
    {
      field: 'activityStatus',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          startIcon={<InfoOutlined />}
          onClick={() => handleButtonClickDosen(params.row)}
          color='success'
          variant='contained'
        >
          Lihat Detail
        </Button>
      ),
    },
  ];
  const columnsLppm = [
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
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          startIcon={<InfoOutlined />}
          onClick={() => handleButtonClickDosen(params.row)}
          color='success'
          variant='contained'
        >
          Lihat Detail
        </Button>
      ),
    },
  ];
  return (
    <Box
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
        rows={activities || []}
        columns={user.role === 'Dosen' ? columnsDosen : columnsLppm}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default ActivityList;
