import mongoose from 'mongoose';

const LetterOfAssignmentSchema = new mongoose.Schema(
  {
    announcementId: {
      type: String,
      required: true,
    },
    uploader: {
      _id: String,
      name: String,
    },
    documentUrl: String,
    documentUrlId: String,
  },
  { timestamps: true }
);

const LetterOfAssignment = mongoose.model(
  'Letter_Of_Assignment',
  LetterOfAssignmentSchema
);

export default LetterOfAssignment;
