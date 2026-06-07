import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: String,
  subject: String,
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'responded'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Contact', contactSchema);
