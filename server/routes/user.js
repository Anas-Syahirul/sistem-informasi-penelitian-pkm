import express from 'express';
import {
  changeProfPict,
  deleteProfPict,
  editPassword,
  getAllDosenName,
  getUserById,
  updateProfile,
} from '../controllers/user.js';
import upload from '../services/multer.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.put('/image', verifyToken, upload.single('userImage'), changeProfPict);

router.delete('/image/:id', verifyToken, deleteProfPict);
router.put('/profile', verifyToken, updateProfile);
router.put('/password', verifyToken, editPassword);
router.get('/name', verifyToken, getAllDosenName);
router.get('/:id', verifyToken, getUserById);
export default router;
