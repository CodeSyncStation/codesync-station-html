import mongoose from "mongoose";

const OrderRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  projectType: {
    type: String,
    required: true,
    enum: ["web-development", "graphic-design", "mobile-app", "seo", "other"],
  },
  details: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  communication: {
    type: String,
    required: true,
    enum: ["email", "phone", "whatsapp", "zoom"],
  },
  notes: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "in-progress", "completed", "cancelled"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if model already exists to avoid overwriting it during hot reloads in dev mode
const OrderRequest =
  mongoose.models.OrderRequest ||
  mongoose.model("OrderRequest", OrderRequestSchema);

export default OrderRequest;
