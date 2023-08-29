import express from 'express';
import { createLOA } from '../controllers/letterOfAssignment.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../services/multer.js';

const router = express.Router();

router.put(
  '/:announcementId',
  verifyToken,
  upload.single('letterOfAssignment'),
  createLOA
);

export default router;
