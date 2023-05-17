import mongoose from 'mongoose';

const activityStatusSchema = new mongoose.Schema({
  name: String,
});

const ActivityStatus = mongoose.model('Activity_Status', activityStatusSchema);

export default ActivityStatus;
