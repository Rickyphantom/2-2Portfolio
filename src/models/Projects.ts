import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  html_url: String,
  language: String,
  stargazers_count: Number,
  updated_at: String,
  custom_description: String,
  image_url: String,
});

export default mongoose.models.Projects ||
  mongoose.model('Projects', projectSchema);
