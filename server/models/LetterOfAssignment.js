import mongoose from 'mongoose';

const LetterOfAssignmentSchema = new mongoose.Schema(
  {
    activityId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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
