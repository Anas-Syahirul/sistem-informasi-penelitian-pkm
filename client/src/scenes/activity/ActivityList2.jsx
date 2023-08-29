import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ActivityList2 = ({
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
  const handleButtonClick = (params) => {
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

  const columns = [
    {
      field: 'karya',
      headerName: 'Karya',
      width: 120,
      flex: 1,
      renderCell: (params) => (
        <div>
          <Typography variant='body1'>{params.row.title}</Typography>
          <Typography variant='body1' gutterBottom>
            {params.row.activityType}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Element 3
          </Typography>
          <Button onClick={console.log(params)}>coba</Button>
        </div>
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
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default ActivityList2;
