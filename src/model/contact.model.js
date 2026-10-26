import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },
    whatsApp: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
    },
    course: {
      type: String,
      trim: true,
      default: "",
      maxlength: 200,
    },
    subject: {
      type: String,
      trim: true,
      default: "",
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
