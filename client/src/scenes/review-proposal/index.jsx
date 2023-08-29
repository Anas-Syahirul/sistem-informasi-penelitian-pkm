import { Box } from '@mui/material';
import React, { useState } from 'react';
import ActivityReviewList from './ActivityReviewList';
import DetailActivity from './DetailActivity';

const ReviewProposal = () => {
  const [mode, setMode] = useState('showList');
  const [activities, setActivities] = useState(null);
  const [activity, setActivity] = useState(null);

  return (
    <Box m='1.5rem 2.5rem'>
      {mode === 'showList' && (
        <ActivityReviewList
          mode={mode}
          setMode={setMode}
          activity={activity}
          setActivity={setActivity}
          activities={activities}
          setActivities={setActivities}
        />
      )}
      {mode === 'detail' && (
        <DetailActivity
          mode={mode}
          setMode={setMode}
          activity={activity}
          setActivity={setActivity}
        />
      )}
    </Box>
  );
};

export default ReviewProposal;
