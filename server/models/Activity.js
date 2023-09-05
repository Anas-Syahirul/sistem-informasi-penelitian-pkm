import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    activityType: String,
    announcementId: String,
    title: String,
    leader: {
      _id: String,
      name: String,
    },
    member: {
      type: Array,
      default: [],
    },
    proposalUrl: {
      type: String,
      default: '',
    },
    proposalUrlId: {
      type: String,
      default: '',
    },
    reviewer: {
      type: Array,
      default: [],
    },
    proposalRevisionNote: {
      type: String,
      default: '',
    },
    monitoringDate: Date,
    monitoringNote: {
      type: String,
      default: '',
    },
    finalReportUrl: {
      type: String,
      default: '',
    },
    finalReportUrlId: {
      type: String,
      default: '',
    },
    activityStatus: String,
    letterOfAssignmentUrl: String,
  },
  { timestamps: true }
);

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;
