import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Header from 'components/Header';
import ProfileCard from 'scenes/profile/ProfileCard';
import React from 'react';
import EditForm from './EditForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Profile = () => {
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='PROFILE' subtitle='Edit Data Profil' />
      <Box display='flex' alignItems='start' mt='5px' width='100%' gap='30px'>
        <ProfileCard />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EditForm />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default Profile;
