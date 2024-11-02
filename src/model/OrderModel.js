import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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
  orderId: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: [
      "pending", // Replaced 'placed'
      "accepted",
      "payment_confirmed",
      "analyzing",
      "req_confirmed",
      "designing",
      "implementing",
      "testing",
      "test_done",
      "review_done",
      "final_payment_pending",
      "delivered",
      "cancelled",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
// Generate unique order ID
OrderSchema.pre("save", function () {
  if (!this.orderId) {
    this.orderId = Math.random().toString(36).substr(2, 9);
  }
});
export default OrderModel;
