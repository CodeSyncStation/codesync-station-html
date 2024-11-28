import mongoose from "mongoose";

export const config = {
  runtime: "nodejs",
};

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
