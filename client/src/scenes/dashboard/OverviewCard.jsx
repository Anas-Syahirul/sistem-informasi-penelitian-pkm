import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

export const OverviewCard = ({ value, sx, icon, title, iconColor }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems='flex-start'
          direction='row'
          justifyContent='space-between'
          spacing={5}
        >
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              {title}
            </Typography>
            <Typography variant='h4'>{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              // backgroundColor: '#32ab32',
              backgroundColor: iconColor,
              height: 50,
              width: 50,
            }}
          >
            <SvgIcon>{icon}</SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
