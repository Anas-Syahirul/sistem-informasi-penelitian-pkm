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
  getFinishedResearch,
  getActivityByLeaderId,
  getActivityByMemberId,
  addReviewer,
  getActivityReviewerNull,
  getMemberName,
  getFinishedPkM,
  updateProposal,
  getCountActivityByAnnouncementId,
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
router.get('/finished-research', verifyToken, getFinishedResearch);
router.get('/finished-pkm', verifyToken, getFinishedPkM);
router.get('/id/:activityId', verifyToken, getActivityById);
router.get(
  '/count/idAnnounce/:announcementId',
  verifyToken,
  getCountActivityByAnnouncementId
);
router.get('/reviewer/nullReviewer', verifyToken, getActivityReviewerNull);
router.get('/reviewer/id', verifyToken, getActivityByReviewer);
router.get('/leaderId', verifyToken, getActivityByLeaderId);
router.get('/memberId', verifyToken, getActivityByMemberId);
router.get('/member', verifyToken, getMemberName);

router.put('/reviewer/:activityId', verifyToken, addReviewer);
router.put(
  '/final-report/:activityId',
  verifyToken,
  upload.single('finalReport'),
  updateFinalReport
);
router.put('/status/:activityId', verifyToken, updateStatus);
router.put(
  '/proposal-revision/:activityId',
  verifyToken,
  upload.single('proposalFile'),
  updateProposal
);
router.put('/status/:activityId', verifyToken, updateStatus);
router.put(
  '/status-revision/:activityId',
  verifyToken,
  updateStatusAndRevisionNote
);
router.put('/monitoring/:activityId', verifyToken, updateMonitoring);

export default router;
