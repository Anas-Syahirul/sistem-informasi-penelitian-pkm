import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema(
  {
    postedBy: {
      type: String,
      required: true,
    },
    editedBy: {
      type: String,
    },
    activityType: {
      type: String,
      required: true,
    },
    academicPositionRequired: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // imageUrl: {
    //   type: String,
    //   default: '',
    // },
    // imageUrlId: {
    //   type: String,
    //   default: '',
    // },
    content: {
      type: String,
      required: true,
      default: '',
    },
    proposalSubmisionDeadline: {
      type: Date,
    },
    monitoringDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;
