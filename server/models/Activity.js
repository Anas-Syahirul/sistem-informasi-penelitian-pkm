import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    activityTypeId: String,
    announcementId: String,
    title: String,
    leaderId: String,
    memberId: {
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
    reviewerId: {
      type: Array,
      default: [],
    },
    proposalRevisionNote: {
      type: String,
      default: '',
    },
    endDate: Date,
    monitoringDate: Date,
    finalReportUrl: {
      type: String,
      default: '',
    },
    finalReportUrlId: {
      type: String,
      default: '',
    },
    activityStatusId: String,
  },
  { timestamps: true }
);

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;
