import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: '',
      required: true,
    },
    activityTypeId: {
      type: String,
      required: true,
    },
    academicPositionRequiredId: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    imageUrlId: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: true,
      default: '',
    },
    proposalSubmisionDeadline: {
      type: Date,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;
