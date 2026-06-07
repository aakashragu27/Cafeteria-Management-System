import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Beverages', 'Pastry', 'Sandwiches'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  image: String,
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Menu', menuSchema);
