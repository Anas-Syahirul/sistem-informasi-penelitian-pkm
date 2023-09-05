// import { Box, Card, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import React from 'react'

// const TaskList = ({tasks, sx}) => {
//   return (
//     <Card sx={sx}>
//       <CardHeader title="Latest Submission" />
//       <Scrollbar sx={{ flexGrow: 1 }}>
//         <Box sx={{ minWidth: 800 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   Order
//                 </TableCell>
//                 <TableCell>
//                   Customer
//                 </TableCell>
//                 <TableCell sortDirection="desc">
//                   Date
//                 </TableCell>
//                 <TableCell>
//                   Status
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tasks.map((order) => {
//                 const createdAt = format(order.createdAt, 'dd/MM/yyyy');

//                 return (
//                   <TableRow
//                     hover
//                     key={order.id}
//                   >
//                     <TableCell>
//                       {order.ref}
//                     </TableCell>
//                     <TableCell>
//                       {order.customer.name}
//                     </TableCell>
//                     <TableCell>
//                       {createdAt}
//                     </TableCell>
//                     <TableCell>
//                       <SeverityPill color={statusMap[order.status]}>
//                         {order.status}
//                       </SeverityPill>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </Box>
//       </Scrollbar>
//       <Divider />
//       <CardActions sx={{ justifyContent: 'flex-end' }}>
//         <Button
//           color="inherit"
//           endIcon={(
//             <SvgIcon fontSize="small">
//               <ArrowRightIcon />
//             </SvgIcon>
//           )}
//           size="small"
//           variant="text"
//         >
//           View all
//         </Button>
//       </CardActions>
//     </Card>
//   )
// }

// export default TaskList
