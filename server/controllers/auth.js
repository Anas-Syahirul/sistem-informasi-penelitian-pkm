import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AcademicPosition from '../models/AcademicPosition.js';
import User from '../models/User.js';
import UserRole from '../models/UserRole.js';

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      roleName,
      password,
      nip,
      phone,
      dateOfBirth,
      academicPosition,
      expertField,
    } = req.body;

    const userRole = await UserRole.findOne({ name: roleName });

    if (!userRole) {
      res.status(404).json({ msg: 'User Role Not Found' });
      return;
    }
    const acadPosition = await AcademicPosition.findOne({
      name: academicPosition,
    });
    if (!acadPosition) {
      res.status(404).json({ msg: 'Academic Position Not Found' });
      return;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      role: userRole.name,
      password: passwordHash,
      nip,
      dateOfBirth,
      academicPosition: acadPosition.name,
      expertField,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).lean();
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
