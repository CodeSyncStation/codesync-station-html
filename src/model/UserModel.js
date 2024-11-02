const bcrypt = require("bcryptjs");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String },
  phone: { type: String },
  image: { type: String },
  role: { type: String, default: "user", enum: ["user", "admin"] },
});

userSchema.pre("save", async function hashPassword(next) {
  // Check if password is modified
  if (!this.isModified("password")) return next();

  // If modified, hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Proceed to the next middleware
  next();
});
userSchema.pre("findOneAndUpdate", async function hashPassword(next) {
  const update = this.getUpdate();

  // Check if password is being modified
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
