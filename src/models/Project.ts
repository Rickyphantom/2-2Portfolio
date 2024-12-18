import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  custom_description: String,
  image_url: String,
  github_url: String,
});

export default mongoose.models.Project ||
  mongoose.model('Project', projectSchema);
