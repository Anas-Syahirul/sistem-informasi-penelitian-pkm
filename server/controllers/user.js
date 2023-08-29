import {
  uploadToCloudinary,
  removeFromCloudinary,
} from '../services/cloudinary.js';
import User from '../models/User.js';
import AcademicPosition from '../models/AcademicPosition.js';
import bcrypt from 'bcrypt';

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

    res.status(200).json({
      msg: 'Profile Picture has been updated',
      profilePicture: data.url,
      profilePictureId: data.public_id,
    });
  } catch (err) {
    res.status(400).json({ error: err });
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

export const updateProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.user.id);
    if (!profile) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const {
      name,
      email,
      role,
      nip,
      phone,
      dateOfBirth,
      academicPosition,
      expertField,
    } = req.body;

    const newAcademicPosition = await AcademicPosition.findOne({
      name: academicPosition,
    });

    if (!newAcademicPosition) {
      return res.status(404).json({ msg: 'Academic Position not Found' });
    }
    const updatedUser = await User.updateOne(
      { _id: req.user.id },
      {
        $set: {
          name,
          email,
          role,
          nip,
          phone,
          dateOfBirth,
          academicPosition,
          expertField,
        },
      }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).jon({ msg: err.message });
  }
};

export const editPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const { prevPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(prevPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'invalid previous password' });
    }

    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    const updatedPassword = await User.updateOne(
      { _id: req.user.id },
      {
        $set: {
          password: newPasswordHash,
        },
      }
    );
    return res.status(200).json({ msg: 'Password succesfully changed' });
  } catch (err) {
    return res.json({ msg: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getAllDosenName = async (req, res) => {
  try {
    // const username = await User.find({}, { name: 1, _id: 0 });
    let names = [];
    const username = (await User.find({ role: 'Dosen' })).forEach((doc) => {
      names.push(`${doc.name} - ${doc.nip}`);
    });
    return res.status(200).json(names);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
