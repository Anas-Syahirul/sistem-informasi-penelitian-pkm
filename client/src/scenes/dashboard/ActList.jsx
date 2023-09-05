// import React from 'react';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardHeader,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   SvgIcon,
//   Typography,
// } from '@mui/material';
// // import { formatDistanceToNow } from 'date-fns';

// export const ActList = ({ products = [], sx }) => {
//   // const { products = [], sx } = props;

//   return (
//     <Card sx={sx}>
//       <CardHeader title='Latest Products' />
//       <List>
//         {products.map((product, index) => {
//           const hasDivider = index < products.length - 1;
//           // const ago = formatDistanceToNow(product.updatedAt);

//           return (
//             <ListItem divider={hasDivider} key={product.id}>
//               <ListItemAvatar>
//                 {product.image ? (
//                   <Box
//                     component='img'
//                     src={product.image}
//                     sx={{
//                       borderRadius: 1,
//                       height: 48,
//                       width: 48,
//                     }}
//                     alt={product.name}
//                   />
//                 ) : (
//                   <Box
//                     sx={{
//                       borderRadius: 1,
//                       backgroundColor: 'neutral.200',
//                       height: 48,
//                       width: 48,
//                     }}
//                   />
//                 )}
//               </ListItemAvatar>
//               <ListItemText
//                 primary={product.name}
//                 primaryTypographyProps={{ variant: 'subtitle1' }}
//                 secondary={
//                   <Typography variant='body2'>
//                     {`Updated ${ago} ago`}
//                   </Typography>
//                 }
//               />
//               <IconButton edge='end'>
//                 <SvgIcon>
//                   <MoreVertIcon />
//                 </SvgIcon>
//               </IconButton>
//             </ListItem>
//           );
//         })}
//       </List>
//       <Divider />
//       <CardActions sx={{ justifyContent: 'flex-end' }}>
//         <Button
//           color='primary'
//           endIcon={<ArrowRightIcon />}
//           size='small'
//           variant='text'
//         >
//           View all
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// // OverviewLatestProducts.propTypes = {
// //   products: PropTypes.array,
// //   sx: PropTypes.object
// // };
// import React from 'react';
// import PropTypes from 'prop-types';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardHeader,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   SvgIcon,
//   Typography,
// } from '@mui/material';

// export const ActList = ({ products = [], sx }) => {
//   return (
//     <Card sx={sx}>
//       <CardHeader title='Latest Products' />
//       <List>
//         {products.map((product, index) => {
//           const hasDivider = index < products.length - 1;

//           return (
//             <ListItem divider={hasDivider} key={product.id}>
//               <ListItemAvatar>
//                 {product.image ? (
//                   <Box
//                     component='img'
//                     src={product.image}
//                     sx={{
//                       borderRadius: 1,
//                       height: 48,
//                       width: 48,
//                     }}
//                     alt={product.name}
//                   />
//                 ) : (
//                   <Box
//                     sx={{
//                       borderRadius: 1,
//                       backgroundColor: 'neutral.200',
//                       height: 48,
//                       width: 48,
//                     }}
//                   />
//                 )}
//               </ListItemAvatar>
//               <ListItemText
//                 primary={product.name}
//                 primaryTypographyProps={{ variant: 'subtitle1' }}
//               />
//               <IconButton edge='end'>
//                 <SvgIcon>
//                   <MoreVertIcon />
//                 </SvgIcon>
//               </IconButton>
//             </ListItem>
//           );
//         })}
//       </List>
//       <Divider />
//       <CardActions sx={{ justifyContent: 'flex-end' }}>
//         <Button
//           color='primary'
//           endIcon={<ArrowRightIcon />}
//           size='small'
//           variant='text'
//         >
//           View all
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// OverviewLatestProducts.propTypes = {
//   products: PropTypes.array,
//   sx: PropTypes.object
// };

import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
  Typography,
  Button,
} from '@mui/material';

export const ActList = ({ activities = [], sx }) => {
  // if (activities.length === 0) {
  //   // Return a message or component when the products array is empty
  //   return (
  //     <Card sx={sx}>
  //       <CardHeader title='Latest Activities' />
  //       <Typography variant='body2' sx={{ padding: 2 }}>
  //         No Activity Available.
  //       </Typography>
  //       <Divider />
  //       <CardActions sx={{ justifyContent: 'flex-end' }}>
  //         <Button
  //           color='secondary'
  //           endIcon={<ArrowRightIcon />}
  //           size='small'
  //           variant='text'
  //         >
  //           View all
  //         </Button>
  //       </CardActions>
  //     </Card>
  //   );
  // }
  return (
    <Card sx={sx}>
      <CardHeader title='Latest Activities' />
      <List>
        {activities.map((activity, index) => {
          const hasDivider = index < activity.length - 1;

          return (
            <ListItem divider={hasDivider} key={activity.id}>
              <ListItemText
                primary={activity.title}
                primaryTypographyProps={{ variant: 'subtitle1' }}
              />
              <IconButton edge='end'>
                <SvgIcon>
                  <MoreVertIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color='secondary'
          endIcon={<ArrowRightIcon />}
          size='small'
          variant='text'
        >
          Lihat Detail
        </Button>
      </CardActions>
    </Card>
  );
};
