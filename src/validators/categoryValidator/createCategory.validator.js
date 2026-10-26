import Category from "../../model/category.model.js";


const createCategoryValidator = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Validate category name
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    // Validate description if provided
    if (
      description !== undefined &&
      (typeof description !== "string" || !description.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Description must be a non-empty string.",
      });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    next();
  } catch (error) {
    console.error("Create category validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default createCategoryValidator;
