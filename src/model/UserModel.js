const bcrypt = require("bcryptjs")
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

userSchema.pre("save", async function (next) {
  // Check if password is modified
  if (!this.isModified("password")) return next();

  // If modified, hash the password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);

  // Proceed to the next middleware
  next();
})

export default mongoose.models.User || mongoose.model("User", userSchema);
