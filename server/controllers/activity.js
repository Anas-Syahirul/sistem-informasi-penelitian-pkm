import Activity from '../models/Activity.js';
import ActivityStatus from '../models/ActivityStatus.js';
import Announcement from '../models/Announcement.js';
import User from '../models/User.js';
import {
  uploadToCloudinary,
  removeFromCloudinary,
} from '../services/cloudinary.js';
import { ObjectId } from 'mongodb';

export const createActivity = async (req, res) => {
  try {
    let { title, member, leaderName } = req.body;
    const leaderId = req.user.id;
    const { announcementId } = req.params;

    let memberId = [];
    member = member.split(',');

    for (let x in member) {
      let myArray = member[x].split(' - ');
      console.log(x);
      let memberIdTemp = await User.findOne(
        {
          name: myArray[0],
          nip: myArray[1],
        },
        { _id: 1, name: 1 }
      );
      if (!memberIdTemp) {
        res.status(404).json({ msg: 'User Not Found' });
        return;
      }
      memberId.push(memberIdTemp);
    }

    const proposalFile = await uploadToCloudinary(
      req.file.path,
      'proposal-file'
    );

    const announcement = await Announcement.findById(announcementId);

    const newActivity = new Activity({
      activityType: announcement.activityType,
      announcementId,
      title,
      leader: {
        _id: leaderId,
        name: leaderName,
      },
      member: memberId,
      proposalUrl: proposalFile.url,
      proposalUrlId: proposalFile.public_id,
      activityStatus: 'pengumpulan proposal',
      endDate: announcement.endDate,
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const addReviewer = async (req, res) => {
  try {
    const { activityId } = req.params;
    let { reviewerName } = req.body;

    let reviewer = [];
    // reviewerName = reviewerName.split(',');

    for (let x in reviewerName) {
      let myArray = reviewerName[x].split(' - ');
      console.log(x);
      let reviewerTemp = await User.findOne(
        {
          name: myArray[0],
          nip: myArray[1],
        },
        { _id: 1, name: 1 }
      );
      // if (!reviewerTemp) {
      //   res.status(404).json({ msg: 'User Not Found' });
      //   return;
      // }
      reviewer.push(reviewerTemp);
    }
    reviewer;

    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          reviewer,
          activityStatus: 'review proposal',
        },
      }
    );

    return res.status(200).json(updatedActivity);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
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

export const getActivityByLeaderId = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const activity = await Activity.find({
      $or: [
        { leader: { _id: req.user.id, name: user.name } },
        { member: { $in: { _id: user._id, name: user.name } } },
      ],
    });

    return res.status(200).json(activity);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getActivityByMemberId = async (req, res) => {
  try {
    const activity = await Activity.find({ memberId: req.user.id });

    return res.status(200).json(activity);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// get nggak boleh ada bodynya
export const getMemberName = async (req, res) => {
  try {
    const { member } = req.body;
    let memberName = [];
    for (let i = 0; i < member.length; i++) {
      await User.findById(member[i]).then((value) => {
        memberName.push(value.name);
      });
    }
    // member.forEach((value) => {
    //   await User.findById(value)
    // })
    console.log(memberName);
    return res.status(200).json(memberName);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// untuk ditunjuk reviewer
export const getActivityReviewerNull = async (req, res) => {
  try {
    const activities = await Activity.find({
      reviewer: { $exists: true, $eq: [] },
    });
    return res.status(200).json(activities);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getActivityByReviewer = async (req, res) => {
  try {
    const userObjectId = new ObjectId(req.user.id);
    const activity = await Activity.find({
      reviewer: {
        $elemMatch: {
          _id: userObjectId,
        },
      },
    });
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
      name: 'published',
    });
    const activities = await Activity.find({
      activityType: 'Penelitian',
      activityStatus: 'published',
    });
    if (!activities) {
      res.status(200).json({ msg: "There's no published activity" });
      return;
    }
    // const member = [];
    // const leader = await User.findById(activities.leaderId).then((val) => {});

    // for (value in activities.memberId) {
    //   let memberName = await User.findById(value);
    //   member.push(memberName.name);
    // }
    // console.log(activities);
    // console.log(leader);
    // activities.leaderId = leader.name;
    // activities.memberId = member;
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getFinishedPkM = async (req, res) => {
  try {
    // const finishedActivityStatus = await ActivityStatus.findOne({
    //   name: 'published',
    // });
    const activities = await Activity.find({
      activityType: 'PkM',
      activityStatus: 'published',
    });
    if (!activities) {
      res.status(200).json({ msg: "There's no finished PkM" });
      return;
    }
    // const leader = await User.findById(activities.leaderId);
    // const member = [];
    // for (value in activities.memberId) {
    //   let memberName = await User.findById(value);
    //   member.push(memberName.name);
    // }
    // activities.leaderId = leader.name;
    // activities.memberId = member;
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getCountActivityByAnnouncementId = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const activity = await Activity.find({
      announcementId,
      $and: [
        { activityStatus: { $ne: 'proposal disetujui' } },
        { activityStatus: { $ne: 'proposal ditolak' } },
        { activityStatus: { $ne: 'pelaksanaan' } },
      ],
    });

    // console.log(activity);
    return res.status(200).json(activity.length);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//gk kepake
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
          activityStatus: 'published',
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

export const updateProposal = async (req, res) => {
  try {
    const proposalFile = await uploadToCloudinary(
      req.file.path,
      'proposal-file'
    );
    const { activityId } = req.params;

    const activity = await Activity.findById(activityId);

    if (activity.proposalUrl !== '') {
      const deleteFile = await removeFromCloudinary(activity.proposalUrlId);
    }

    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          activityStatus: 'pengumpulan revisi',
          proposalUrl: proposalFile.url,
          proposalUrlId: proposalFile.public_id,
        },
      }
    );

    res.status(200).json('The Proposal Revision has been uploaded');
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Untuk update status: ditolak, pelaksanaan kegiatan, dan selesai
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { activityId } = req.params;
    console.log(status);
    const activityStatus = await ActivityStatus.findOne({ name: status }).then(
      (val) => {
        console.log(val);
        if (!val) {
          res.status(404).json({ msg: 'activity Status not found' });
          return;
        }
      }
    );

    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          activityStatus: status,
        },
      }
    );
    res
      .status(200)
      .json({ msg: `Activity status has been updated to "${status}"` });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateStatusAndRevisionNote = async (req, res) => {
  try {
    const status = 'revisi proposal';
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId).then((val) => {
      if (!val) {
        res.status(404).json({ msg: 'Activity not found' });
        return;
      }
    });
    const { revisionNote } = req.body;

    const updatedActivity = await Activity.updateOne(
      { _id: activityId },
      {
        $set: {
          activityStatus: status,
          proposalRevisionNote: revisionNote,
        },
      }
    );
    res
      .status(200)
      .json({ msg: `Activity has been successfully updated to ${status}` });
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
