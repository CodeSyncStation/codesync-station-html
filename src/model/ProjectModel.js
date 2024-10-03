import mongoose from "mongoose";

// projects model
const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  liveLink: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
})

export default mongoose.models.Project || mongoose.model("Project", projectSchema);