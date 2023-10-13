import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import { DataCard } from './DataCard';
import { OverviewCard } from './OverviewCard';
import { BiotechOutlined, PeopleOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { ActList } from './ActList';

const Dashboard = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [countResearch, setCountResearch] = useState(0);
  const [countPkm, setCountPkm] = useState(0);
  const [countOGPkm, setCountOGPkm] = useState(0);
  const [countOGResearch, setCountOGResearch] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (user.role === 'LPPM') {
      getRecentAnnouncement();
      getCountAllOnGoingPKM();
      getCountAllOnGoingResearch();
    } else {
      getRecentActivity();
      getCountOnGoingResearch();
      getCountOnGoingPKM();
      getCountResearch();
      getCountPkm();
    }
    // getRecentActivity();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCountResearch = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/count-finished-research',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setCountResearch(data.total);
      console.log({ data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCountPkm = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/count-finished-pkm',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setCountPkm(data.total);
      console.log({ data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCountOnGoingResearch = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/countOnGoingResearch',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setCountOGResearch(data.total);
      console.log({ data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCountOnGoingPKM = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/countOnGoingPkM',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setCountOGPkm(data.total);
      console.log({ data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCountAllOnGoingResearch = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/count-all-OnGoingResearch',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setCountOGResearch(data.total);
      console.log({ data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCountAllOnGoingPKM = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/count-all-OnGoingPkM',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setCountOGPkm(data.total);
      console.log({ data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getRecentActivity = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/activity/recent-activity',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setRecentActivity(data);
      console.log(recentActivity);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getRecentAnnouncement = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/announcement/recent-announcement',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setRecentActivity(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='DASHBOARD' subtitle='' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Grid container spacing={3} gap='1rem'>
            {/* <Grid xs={12} sm={6} lg={3}>
              <DataCard
                difference={12}
                positive
                sx={{ height: '100%', backgroundColor: '#415a77' }}
                value='$24k'
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <DataCard
                difference={12}
                positive
                sx={{ height: '100%' }}
                value='$24k'
              />
            </Grid> */}
            {user.role === 'Dosen' && (
              <>
                <Grid xs={12} sm={6} lg={2.5}>
                  <OverviewCard
                    sx={{ height: '100%', backgroundColor: '#415a77' }}
                    value={countResearch}
                    icon={<BiotechOutlined />}
                    title={'Publikasi Penelitian'}
                    iconColor={'#32ab32'}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={2.5}>
                  <OverviewCard
                    sx={{ height: '100%', backgroundColor: '#415a77' }}
                    value={countPkm}
                    icon={<PeopleOutlined />}
                    title={'Publikasi PkM'}
                    iconColor={'#32ab32'}
                  />
                </Grid>
              </>
            )}
            <Grid xs={12} sm={6} lg={2.5}>
              <OverviewCard
                sx={{ height: '100%', backgroundColor: '#415a77' }}
                value={countOGResearch}
                icon={<BiotechOutlined />}
                title={'Penelitian Berjalan'}
                iconColor='#ffcc00'
              />
            </Grid>
            <Grid xs={12} sm={6} lg={2.5}>
              <OverviewCard
                sx={{ height: '100%', backgroundColor: '#415a77' }}
                value={countOGPkm}
                icon={<PeopleOutlined />}
                title={'PkM Berjalan'}
                iconColor={'#ffcc00'}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <ActList
                activities={recentActivity}
                sx={{ height: '100%', backgroundColor: '#415a77' }}
                title={
                  user.role === 'LPPM'
                    ? 'Pengumuman Terbaru'
                    : 'Aktivitas Terbaru'
                }
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title='Weekly Sales'
            total={714000}
            icon={'ant-design:android-filled'}
          />
        </Grid>
      </Grid> */}

      {/* -------------------- */}
      {/* <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Budget
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card> */}
    </Box>
  );
};

export default Dashboard;
