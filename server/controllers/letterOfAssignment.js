import LetterOfAssignment from '../models/LetterOfAssignment.js';
import ActivityType from '../models/ActivityType.js';
import Activity from '../models/Activity.js';
import {
  uploadToCloudinary,
  removeFromCloudinary,
} from '../services/cloudinary.js';
import Announcement from '../models/Announcement.js';

export const createLOA = async (req, res) => {
  try {
    const document = await uploadToCloudinary(
      req.file.path,
      'letter-of-assignment'
    );

    const userId = req.user.id;
    const { username } = req.body;
    const { announcementId } = req.params;
    const announcement = await Announcement.findById(announcementId);
    const newLOA = new LetterOfAssignment({
      announcementId,
      uploader: {
        _id: userId,
        name: username,
      },
      documentUrl: document.url,
      documentUrlId: document.public_id,
    });

    const activities = await Activity.updateMany(
      { announcementId, activityStatus: 'proposal disetujui' },
      {
        $set: {
          letterOfAssignmentUrl: document.url,
          activityStatus: 'pelaksanaan',
        },
      }
    );

    const savedLOA = await newLOA.save();

    res.status(201).json(savedLOA);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// export const getLOAById = async (req, res) => {
//   try {
//     const
//   } catch (err) {

//   }
// }
