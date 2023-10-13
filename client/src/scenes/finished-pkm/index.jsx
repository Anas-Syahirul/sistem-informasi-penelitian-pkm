import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from 'components/Header';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DetailPkm from './DetailPkm';

const FinishedPkm = () => {
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const [pkm, setPkm] = useState(null);
  const [mode, setMode] = useState('showList');
  const [activity, setActivity] = useState(null);

  const handleButtonClickPkm = (params) => {
    setActivity(params);
    setMode('detail');
  };

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
      width: 140,
      renderCell: (params) => (
        <Button
          startIcon={<InfoOutlined />}
          onClick={() => handleButtonClickPkm(params.row)}
          color='success'
          variant='contained'
        >
          Lihat Detail
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getFinishedPkm();
  }, []);

  const getFinishedPkm = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/finished-pkm',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setPkm(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {mode === 'detail' && (
        <DetailPkm
          activity={activity}
          setActivity={setActivity}
          mode={mode}
          setMode={setMode}
        />
      )}
      {mode === 'showList' && (
        <Box m='1.5rem 2.5rem'>
          <Header
            title='Daftar Kegiatan Pengabdian kepada Masyarakat'
            subtitle='Berikut merupakan Kegiatan Pengabdian kepada Masyarakat yang telah selesai dilaksanakan'
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
              rows={pkm || []}
              columns={columns}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default FinishedPkm;
