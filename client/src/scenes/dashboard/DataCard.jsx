// import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
// import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
// import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  AttachMoneyOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

export const DataCard = ({ difference, positive = false, sx, value }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems='flex-start'
          direction='row'
          justifyContent='space-between'
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              Budget
            </Typography>
            <Typography variant='h4'>{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <AttachMoneyOutlined />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems='center' direction='row' spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems='center' direction='row' spacing={0.5}>
              <SvgIcon color={positive ? 'success' : 'error'} fontSize='small'>
                {positive ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant='body2'
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography color='text.secondary' variant='caption'>
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
