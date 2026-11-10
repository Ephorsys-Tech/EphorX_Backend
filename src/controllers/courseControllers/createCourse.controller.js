
import createCourseService from "../../services/courseService/createCourse.service.js";

const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      categoryId,
      Originalprice,
      discountPrice,
      duration,
    } = req.body;

    const image = req.files?.image?.[0];
    const syllabus = req.files?.syllabus?.[0];

    const course = await createCourseService(
      {
        title,
        description,
        type,
        Originalprice,
        discountPrice,
        duration,
        categoryId,
      },
      image,
      syllabus
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully.",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

export default createCourse;
