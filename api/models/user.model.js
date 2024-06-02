import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { tupe: String, required: true, unique: true },
    email: { tupe: String, required: true, unique: true },
    password: { tupe: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
