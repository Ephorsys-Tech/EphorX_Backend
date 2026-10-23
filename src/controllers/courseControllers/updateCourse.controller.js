
import updateCourseService from "../../services/courseService/updateCourse.service.js";

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, categoryId } = req.body;

    const updateData = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (type !== undefined) updateData.type = type.trim();
    if (categoryId !== undefined) updateData.categoryId = categoryId;

    // Read optional uploaded files
    const image = req.files?.image?.[0];
    const syllabus = req.files?.syllabus?.[0];

    const updatedCourse = await updateCourseService(
      id,
      updateData,
      image,
      syllabus
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Update course error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default updateCourse;
