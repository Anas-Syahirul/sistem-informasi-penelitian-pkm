import mongoose from 'mongoose';

const UserRoleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const UserRole = mongoose.model('User_Role', UserRoleSchema);
export default UserRole;
