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
    // const dataImg = await uploadToCloudinary(req.file.path, 'announce-poster');

    const {
      activityTypeName,
      title,
      academicPositionRequired,
      content,
      proposalSubmisionDeadline,
      endDate,
    } = req.body;
    // const user = await User.findById(userId);
    const activityType = await ActivityType.findOne({ name: activityTypeName });

    if (!activityType) {
      console.log(activityType);
      res.status(404).json({ msg: 'Activity Type Undefined' });
      return;
    }

    // const academicPositionRequiredId = academicPositionRequired.map(await Announcement.findOne())
    // let academicPositionRequiredId = [];

    for (let x in academicPositionRequired) {
      let academicPositionRequiredIdTemp = await AcademicPosition.findOne({
        name: academicPositionRequired[x],
      });
      if (!academicPositionRequiredIdTemp) {
        res.status(404).json({ msg: 'Academic Position Undefined' });
        return;
      }
      // academicPositionRequiredId.push(academicPositionRequiredIdTemp);
    }

    const newAnnouncement = new Announcement({
      postedBy: req.user.id,
      activityType: activityType.name,
      academicPositionRequired,
      title,
      // imageUrl: dataImg.url,
      // imageUrlId: dataImg.public_id,
      content,
      proposalSubmisionDeadline: new Date(proposalSubmisionDeadline),
      endDate: new Date(endDate),
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
    console.log(typeof announcement);
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

    // for (let i = 0; i < announcements.length; i++) {
    //   announcements[i]['activityType'] = await ActivityType.findById(
    //     announcements[i].activityTypeId
    //   ).name;
    //   delete announcements[i].activityTypeId;
    // }
    // const activityType = await ActivityType.findOne({})
    // const jsonAnnouncement = JSON.stringify(announcements);
    // const editedAnnouncement = jsonAnnouncement.map((obj) => {
    //   const { activityTypeId, ...rest } = obj;
    //   return {
    //     ...rest,
    //     activityType: ActivityType.findById(activityTypeId),
    //   };
    // });
    // let announcement = []
    for (let i = 0; i < announcements.length; i++) {
      announcements[i].activityTypeId = ActivityType.findById(
        announcements[i].activityTypeId
      ).name;
    }
    // const newAnnouncement = await updateDataAsync(announcements);
    console.log(announcements[0]);
    return res.status(200).json(announcements);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// const updateDataAsync = async (data) => {
//   const updatedData = await Promise.all(
//     data.map(async ({ activityTypeId, ...rest }) => {
//       let activityType = await ActivityType.findById(activityTypeId); // Double the count
//       activityType = activityType.name;

//       // Simulate asynchronous operation
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       return {
//         ...rest,
//         activityType,
//       };
//     })
//   );

//   return updatedData;
// };

export const updateAnnouncement = async (req, res) => {
  try {
    const prevAnnouncement = await Announcement.findById(req.params.id);

    // poster
    // const dataImg = await uploadToCloudinary(req.file.path, 'announce-poster');

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

    // if (prevAnnouncement.imageUrlId !== '') {
    //   const deleteImage = await removeFromCloudinary(
    //     prevAnnouncement.imageUrlId
    //   );
    //   return;
    // }

    const newAnnouncement = new Announcement({
      userId: req.user.id,
      activityType: activityType.name,
      title,
      // imageUrl: dataImg.url,
      // imageUrlId: dataImg.public_id,
      content,
      proposalSubmisionDeadline: new Date(proposalSubmisionDeadline),
      endDate,
    });

    const announcement = await Announcement.updateOne(
      { _id: req.params.id },
      {
        $set: {
          userId: newAnnouncement.userId,
          activityType: newAnnouncement.activityType,
          title: newAnnouncement.title,
          // imageUrl: newAnnouncement.imageUrl,
          // imageUrlId: newAnnouncement.imageUrlId,
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
