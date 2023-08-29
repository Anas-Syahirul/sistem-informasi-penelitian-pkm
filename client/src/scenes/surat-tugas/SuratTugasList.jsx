import { Box, Button, useTheme } from '@mui/material';
import React, { useState } from 'react';

const SuratTugasList = ({ mode, setMode }) => {
  const [announceMode, setAnnounceMode] = useState('all');
  const theme = useTheme();
  return (
    <div>
      <Box display='flex' justifyContent='start' gap='30px'>
        <Button variant='outlined' color={theme.palette.primary.main}>
          Semua Pengumuman
        </Button>
        <Button variant='outlined' color={theme.palette.primary.main}>
          Semua Pengumuman
        </Button>
        <Button variant='outlined' color={theme.palette.primary.main}>
          Semua Pengumuman
        </Button>
      </Box>
    </div>
  );
};

export default SuratTugasList;
