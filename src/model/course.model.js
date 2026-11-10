
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    imagePublicId: {
      type: String,
      default: "",
    },

    syllabusUrl: {
      type: String,
      default: "",
    },

    syllabusPublicId: {
      type: String,
      default: "",
    },
    Originalprice:{
      type:String,
      default:"",
      required:true
    },

    discountPrice:{
      type:String,
      default:"",
      required:true
    },

    duration:{
      type:String,
      default:"",
      required:true
    }

  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
