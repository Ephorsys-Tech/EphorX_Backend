
import deleteCategoryService from "../../services/categoryService/deleteCategory.service.js";

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await deleteCategoryService(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
      category,
    });
  } catch (error) {
    console.error("Delete category error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

export default deleteCategory;
