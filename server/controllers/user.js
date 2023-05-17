import {
  uploadToCloudinary,
  removeFromCloudinary,
} from '../services/cloudinary.js';
import User from '../models/User.js';

export const changeProfPict = async (req, res) => {
  try {
    const data = await uploadToCloudinary(req.file.path, 'user-image');
    const { id } = req.user;

    const user = await User.findById(id);

    // if (req.user.id != user._id.toString()) {
    //   res.status(400).json({ error: "you can't update another User" });
    //   return;
    // }

    if (user.profilePicture !== '') {
      const deleteImage = await removeFromCloudinary(user.profilePictureId);
    }

    const savedImg = await User.updateOne(
      { _id: id },
      {
        $set: {
          profilePicture: data.url,
          profilePictureId: data.public_id,
        },
      }
    );

    res.status(200).json({ msg: 'Profile Picture has been updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProfPict = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { id } = req.user;

    if (req.user.id != user._id.toString()) {
      res.status(400).json({ error: "you can't update another User" });
      return;
    }

    if (user.profilePicture != '') {
      await removeFromCloudinary(user.profilePictureId);

      const deletImg = await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            profilePicture: '',
            profilePictureId: '',
          },
        }
      );
    }

    res.status(200).json({ msg: 'Profile Picture has been deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
