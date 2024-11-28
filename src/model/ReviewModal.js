import mongoose from "mongoose";

export const config = {
  runtime: "nodejs",
};

const reviewSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ["Trustpilot", "Google", "Yelp", "Other"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
