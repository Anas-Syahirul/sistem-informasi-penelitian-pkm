import mongoose from 'mongoose';

export const AcademicPositionSchema = new mongoose.Schema({
  name: String,
});

const AcademicPosition = mongoose.model(
  'Academic_Position',
  AcademicPositionSchema
);
export default AcademicPosition;
