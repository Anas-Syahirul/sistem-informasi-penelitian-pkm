import ActivityType from '../models/ActivityType.js';
import Announcement from '../models/Announcement.js';
import {
  uploadToCloudinary,
  removeFromCloudinary,
} from '../services/cloudinary.js';
import AcademicPosition from '../models/AcademicPosition.js';
import User from '../models/User.js';

export const createAnnouncement = async (req, res) => {
  try {
    const dataImg = await uploadToCloudinary(req.file.path, 'announce-poster');

    const {
      activityTypeName,
      title,
      content,
      proposalSubmisionDeadline,
      endDate,
      academicPositionRequired,
    } = req.body;
    // const user = await User.findById(userId);
    const activityType = await ActivityType.findOne({ name: activityTypeName });

    if (activityType == undefined) {
      res.status(400).json({ msg: 'Activity Type Undefined' });
      return;
    }

    // const academicPositionRequiredId = academicPositionRequired.map(await Announcement.findOne())
    let academicPositionRequiredId = [];

    for (let x in academicPositionRequired) {
      let academicPositionRequiredIdTemp = await AcademicPosition.findOne({
        name: academicPositionRequired[x],
      });
      if (!academicPositionRequiredIdTemp) {
        res.status(400).json({ msg: 'Academic Position Undefined' });
        return;
      }
      academicPositionRequiredId[x] = academicPositionRequiredIdTemp._id;
    }

    const newAnnouncement = new Announcement({
      userId: req.user.id,
      activityTypeId: activityType.name,
      academicPositionRequiredId,
      title,
      imageUrl: dataImg.url,
      imageUrlId: dataImg.public_id,
      content,
      proposalSubmisionDeadline: new Date(proposalSubmisionDeadline),
      endDate,
    });
    const savedAnnouncement = await newAnnouncement.save();

    res.status(201).json(savedAnnouncement);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      res.status(404).json({ msg: 'The Announcement was not found' });
      return;
    }
    const deletedPoster = await removeFromCloudinary(announcement.imageUrlId);

    const deletedAnnouncement = await Announcement.deleteOne({
      _id: announcement._id,
    });

    res.status(200).json({ msg: 'Announcement was deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      res.status(404).json({ msg: 'The Announcement was not found' });
      return;
    }
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAllAnnouncement = async (req, res) => {
  try {
    const announcements = await Announcement.find();

    if (!announcements) {
      res.status(200).json({ msg: "There's no announcement exist" });
      return;
    }
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const prevAnnouncement = await Announcement.findById(req.params.id);

    const dataImg = await uploadToCloudinary(req.file.path, 'announce-poster');

    const {
      activityTypeName,
      title,
      content,
      proposalSubmisionDeadline,
      endDate,
    } = req.body;
    // const user = await User.findById(userId);
    const activityType = await ActivityType.findOne({ name: activityTypeName });

    if (activityType == undefined) {
      res.status(400).json({ msg: 'Activity Type Undefined' });
      return;
    }

    if (prevAnnouncement.imageUrlId !== '') {
      const deleteImage = await removeFromCloudinary(
        prevAnnouncement.imageUrlId
      );
      return;
    }

    const newAnnouncement = new Announcement({
      userId: req.user.id,
      activityTypeId: activityType.name,
      title,
      imageUrl: dataImg.url,
      imageUrlId: dataImg.public_id,
      content,
      proposalSubmisionDeadline: new Date(proposalSubmisionDeadline),
      endDate,
    });

    const announcement = await Announcement.updateOne(
      { _id: req.params.id },
      {
        $set: {
          userId: newAnnouncement.userId,
          activityTypeId: newAnnouncement.activityTypeId,
          title: newAnnouncement.title,
          imageUrl: newAnnouncement.imageUrl,
          imageUrlId: newAnnouncement.imageUrlId,
          content: newAnnouncement.content,
          proposalSubmisionDeadline: newAnnouncement.proposalSubmisionDeadline,
        },
      }
    );

    return res
      .status(200)
      .json({ msg: 'The Announcement has been successfully updated' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
