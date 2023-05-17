import express from 'express';
import {
  createActivity,
  getActivityById,
  getActivityByReviewer,
  getFinishedActivity,
  updateReviewer,
  updateFinalReport,
  updateStatus,
  updateStatusAndRevisionNote,
  updateMonitoring,
} from '../controllers/activity.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../services/multer.js';

const router = express.Router();

router.post(
  '/:announcementId',
  verifyToken,
  upload.single('proposalFile'),
  createActivity
);

router.get('/finished-status', verifyToken, getFinishedActivity);
router.get('/id/:activityId', verifyToken, getActivityById);
router.get('/reviewer/:reviewerId', verifyToken, getActivityByReviewer);

router.put('/reviewer/:activityId', verifyToken, updateReviewer);
router.put(
  '/final-report/:activityId',
  verifyToken,
  upload.single('finalReport'),
  updateFinalReport
);
router.put('/status/:activityId', verifyToken, updateStatus);
router.put(
  '/status-revision/:activityId/revision',
  verifyToken,
  updateStatusAndRevisionNote
);
router.put('/monitoring/:activityId', verifyToken, updateMonitoring);

export default router;
