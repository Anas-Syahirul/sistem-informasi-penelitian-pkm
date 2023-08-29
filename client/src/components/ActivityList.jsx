import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ActivityList = (FinishedActivity) => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const [activities, setActivities] = useState(null);

  const columns = [
    {
      field: 'activityType',
      headerName: 'Jenis Kegiatan',
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Judul Karya',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          startIcon={<InfoOutlined />}
          // onClick={() => handleButtonClickDosen(params.row)}
          color='success'
          variant='contained'
        >
          Lihat Detail
        </Button>
      ),
    },
  ];

  useEffect(() => {
    FinishedActivity();
  }, []);

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
        // loading={isLoading || !data}
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

export default ActivityList;
