import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const FinishedResearch = () => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const [researches, setResearches] = useState(null);
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
    getFinishedResearch();
  }, []);

  const getFinishedResearch = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/finished-research',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setResearches(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='Daftar Penelitian'
        subtitle='Berikut merupakan penelitian yang telah selesai dilaksanakan'
      />
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
          rows={researches || []}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default FinishedResearch;
