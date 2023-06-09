import { Box } from '@mui/material';
import Header from 'components/Header';
import React from 'react';

const FinishedPkm = () => {
  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='Daftar Kegiatan Pengabdian kepada Masyarakat'
        subtitle='Berikut merupakan Kegiatan Pengabdian kepada Masyarakat yang telah selesai dilaksanakan'
      />
    </Box>
  );
};

export default FinishedPkm;
