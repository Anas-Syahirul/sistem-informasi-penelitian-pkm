import mongoose from 'mongoose';

const activityTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const ActivityType = mongoose.model('Activity_Type', activityTypeSchema);
export default ActivityType;
