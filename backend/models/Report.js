

import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  ngoId: { type: String, required: true },
  month: { type: String, required: true }, 
  peopleHelped: { type: Number, required: true },
  eventsConducted: { type: Number, required: true },
  fundsUtilized: { type: Number, required: true },
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;
