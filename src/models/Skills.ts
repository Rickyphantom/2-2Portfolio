import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema({
  name: String,
  items: [String],
});

export default mongoose.models.Skills || mongoose.model('Skills', skillsSchema);
