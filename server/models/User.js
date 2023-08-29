import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    nip: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    profilePictureId: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    dateOfBirth: {
      type: Date,
    },
    academicPosition: {
      type: String,
    },
    expertField: {
      type: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
