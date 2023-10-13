import { ArrowBackIosOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DetailResearch = ({ activity, setActivity, mode, setMode }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const [leader, setLeader] = useState(null);
  const [member, setMember] = useState([]);

  const getUserName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      await response.json().then((value) => {
        setLeader(value);
      });
      // console.log(announcement);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    let memberName = [];
    for (let i = 0; i < activity.member.length; i++) {
      const val = activity.member[i];
      memberName.push(val.name);
    }
    setMember(memberName.toString());
    getUserName(activity.leader._id);
  });
  return (
    <Box m='1.5rem 2.5rem'>
      <Box display='flex' justifyContent='start' mt='20px' mb='20px'>
        <Button
          startIcon={<ArrowBackIosOutlined />}
          color='secondary'
          variant='contained'
          onClick={() => {
            setMode('showList');
            setActivity(null);
          }}
        >
          Kembali
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width='10%' sx={{ width: '30%' }}>
                Karya
              </TableCell>
              <TableCell width='90%'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell width='30%'>Title</TableCell>
              <TableCell width='70%'>
                {activity ? activity.title : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='30%'>Ketua</TableCell>
              <TableCell width='70%'>{leader ? leader.name : ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='30%'>Anggota</TableCell>
              <TableCell width='70%'>{member ? member : ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='30%'>Status</TableCell>
              <TableCell width='70%'>
                {activity ? activity.activityStatus : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='30%'>Surat Penugasan</TableCell>
              <TableCell width='70%'>
                <Typography>
                  <Link
                    href={activity.proposalUrl}
                    target='_blank'
                    rel='noopener'
                  >
                    Dokumen Surat Penugasan
                  </Link>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DetailResearch;
