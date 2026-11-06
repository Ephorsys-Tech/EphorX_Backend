
import CollegeTieUp from "../../model/collegeTieUpModel.js";


const deleteCollegeTieUpService = async (id) => {
  const college = await CollegeTieUp.findById(id);

  if (!college) {
    return null;
  }

  await CollegeTieUp.findByIdAndDelete(id);

  // Delete logo from Cloudinary
  if (college.publicId) {
    try {
      await deleteCollegeLogoFromCloudinary(college.publicId);
    } catch (error) {
      console.error("Cloudinary logo deletion failed:", error);
    }
  }

  return college;
};

export default deleteCollegeTieUpService;
