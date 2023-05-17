import LetterOfAssignment from '../models/LetterOfAssignment.js';
import ActivityType from '../models/ActivityType.js';
import {
  uploadToCloudinary,
  removeFromCloudinary,
} from '../services/cloudinary';

export const createLOA = async (req, res) => {
  try {
    const document = await uploadToCloudinary(
      req.file.path,
      'letter-of-assignment'
    );

    const { activityId, userId } = req.body;
    const newLOA = new LetterOfAssignment({
      activityId,
      userId,
      documentUrl: document.url,
      documentUrlId: document.public_id,
    });

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
