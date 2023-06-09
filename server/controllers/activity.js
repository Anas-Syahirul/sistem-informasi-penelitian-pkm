import Activity from '../models/Activity.js';
import ActivityStatus from '../models/ActivityStatus.js';
import Announcement from '../models/Announcement.js';
import { uploadToCloudinary } from '../services/cloudinary.js';

export const createActivity = async (req, res) => {
  try {
    const { title, memberId } = req.body;
    const leaderId = req.user.id;
    const { announcementId } = req.params;

    const proposalFile = await uploadToCloudinary(
      req.file.path,
      'proposal-file'
    );

    const announcement = await Announcement.findById(announcementId);

    const newActivity = new Activity({
      activityTypeId: announcement.activityTypeId,
      announcementId,
      title,
      leaderId,
      memberId,
      proposalUrl: proposalFile.url,
      proposalUrlId: proposalFile.public_id,
      activityStatusId: 'proposal selection',
      endDate: announcement.endDate,
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId);

    if (!activity) {
      res.status(404).json({ msg: 'The Activity was not found!' });
      return;
    }
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getActivityByReviewer = async (req, res) => {
  try {
    const activity = await Activity.find({ reviewerId: req.user.id });
    if (!activity) {
      res.status(200).json({ msg: "There's no activity exist" });
      return;
    }
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getFinishedActivity = async (req, res) => {
  try {
    const finishedActivityStatus = await ActivityStatus.findOne({
      name: 'selesai',
    });
    const activities = await Activity.find({
      activityTypeId: 'penelitian',
      activityStatusId: finishedActivityStatus.name,
    });
    if (!activities) {
      res.status(200).json({ msg: "There's no finished activity" });
      return;
    }
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getFinishedResearch = async (req, res) => {
  try {
    const finishedActivityStatus = await ActivityStatus.findOne({
      name: 'selesai',
    });
    const activities = await Activity.find({
      activityTypeId: 'penelitian',
      activityStatusId: finishedActivityStatus.name,
    });
    if (!activities) {
      res.status(200).json({ msg: "There's no finished activity" });
      return;
    }
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateReviewer = async (req, res) => {
  try {
    // const prevActivity = await Activity.findById(req.user.id);

    const { reviewerId } = req.body;
    const { activityId } = req.params;

    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          reviewerId,
        },
      }
    );

    res.status(200).json('The reviewer has been added');
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateFinalReport = async (req, res) => {
  try {
    const finalReport = await uploadToCloudinary(req.file.path, 'final-report');
    const { activityId } = req.params;

    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          finalReportUrl: finalReport.url,
          finalReportUrlId: finalReport.public_id,
        },
      }
    );

    res.status(200).json('The Last Report Document has been uploaded');
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Untuk update status: ditolak, pelaksanaan kegiatan, dan selesai
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { activityId } = req.params;
    const activityStatus = await ActivityStatus.findOne({ name: status });
    if (!activityStatus) {
      res.status(404).json({ msg: 'activity Status not found' });
      return;
    }

    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          status,
        },
      }
    );
    res.status(200).json({ msg: 'Activity status has been updated' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateStatusAndRevisionNote = async (req, res) => {
  try {
    const status = 'Revisi Proposal';
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId);
    const { revisionNote } = req.body;
    if (!activity) {
      res.status(404).json({ msg: 'Activity not found' });
      return;
    }

    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          status,
          proposalRevisionNote: revisionNote,
        },
      }
    );
    res.status(200).json({ msg: 'Activity has been successfully updated' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateMonitoring = async (req, res) => {
  try {
    const { activityId } = req.params;
    const { monitoringDate } = req.body;
    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          monitoringDate,
        },
      }
    );

    res
      .status(200)
      .json({ msg: 'Monitoring Date has been successfully updated' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
