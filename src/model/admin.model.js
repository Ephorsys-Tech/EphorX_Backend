import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    resetPasswordOtp: {
      type: String,
      default: null,
      select: false,
    },
    resetPasswordOtpExpires: {
      type: Date,
      default: null,
      select: false,
    },
    resetPasswordOtpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    resetPasswordVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    resetPasswordTokenHash: {
      type: String,
      default: null,
      select: false,
    },
    resetPasswordTokenExpires: {
      type: Date,
      default: null,
      select: false,
    },

  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;