import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  type: String, // '2025' 또는 'long-term'
  title: String,
  description: String,
  order: Number,
});

export default mongoose.models.Goals || mongoose.model('Goals', goalSchema);
