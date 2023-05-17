import express from 'express';
import { changeProfPict, deleteProfPict } from '../controllers/user.js';
import upload from '../services/multer.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/image/:userId',
  verifyToken,
  upload.single('userImage'),
  changeProfPict
);

router.delete('/image/:id', verifyToken, deleteProfPict);

export default router;
