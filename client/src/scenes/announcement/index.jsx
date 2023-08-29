import { Box } from '@mui/material';
import React, { useState } from 'react';
import CreateAnnouncement from './CreateAnnouncement';
import AnnouncementList from './AnnouncementList';
import EditAnnouncement from './EditAnnouncement';
import DetailAnnouncement from './DetailAnnouncement';
import Register from './Register';
import SuratTugas from './SuratTugas';

const Announcement = () => {
  const [mode, setMode] = useState('showList');
  const [idAnnouncement, setIdAnnouncement] = useState(null);
  const [announcement, setAnnouncement] = useState(null);
  const [userAnnouncement, setUserAnnouncement] = useState(null);

  return (
    <Box m='1.5rem 2.5rem'>
      {mode === 'create' && (
        <CreateAnnouncement mode={mode} setMode={setMode} />
      )}
      {mode === 'showList' && (
        <AnnouncementList
          mode={mode}
          setMode={setMode}
          idAnnouncement={idAnnouncement}
          setIdAnnouncement={setIdAnnouncement}
          announcement={announcement}
          setAnnouncement={setAnnouncement}
          userAnnouncement={userAnnouncement}
          setUserAnnouncement={setUserAnnouncement}
        />
      )}
      {mode === 'edit' && <EditAnnouncement mode={mode} setMode={setMode} />}

      {mode === 'detail' && (
        <DetailAnnouncement
          mode={mode}
          setMode={setMode}
          idAnnouncement={idAnnouncement}
          setIdAnnouncement={setIdAnnouncement}
          announcement={announcement}
          setAnnouncement={setAnnouncement}
          userAnnouncement={userAnnouncement}
          setUserAnnouncement={setUserAnnouncement}
        />
      )}

      {mode === 'register' && (
        <Register
          announcement={announcement}
          idAnnouncement={idAnnouncement}
          mode={mode}
          setMode={setMode}
        />
      )}

      {mode === 'surat-tugas' && (
        <SuratTugas
          mode={mode}
          setMode={setMode}
          announcement={announcement}
          setAnnouncement={setAnnouncement}
        />
      )}
    </Box>
  );
};

export default Announcement;
