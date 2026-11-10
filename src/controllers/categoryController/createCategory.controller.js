
import createCategoryService from "../../services/categoryService/createCategory.service.js";

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const categoryData = {
      name: name.trim(),
      description: description?.trim() || "",
    };

    const category = await createCategoryService(categoryData);

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    // Handle duplicate names if the database unique index catches a race
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default createCategory;
