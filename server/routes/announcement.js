import express from 'express';
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncement,
  getAllAnnouncement,
  updateAnnouncement,
  getAnnouncementActive,
  getRecentAnnouncement,
} from '../controllers/announcement.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../services/multer.js';

const router = express.Router();

router.post(
  '/',
  verifyToken,
  // upload.single('announcePoster'),
  createAnnouncement
);

router.delete('/:id', verifyToken, deleteAnnouncement);
router.get('/active', verifyToken, getAnnouncementActive);
router.get('/recent-announcement', verifyToken, getRecentAnnouncement);
router.get('/:id', verifyToken, getAnnouncement);
router.get('/', verifyToken, getAllAnnouncement);
router.put(
  '/:id',
  verifyToken,
  // upload.single('announcePoster'),
  updateAnnouncement
);
export default router;
