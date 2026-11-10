import getCategoryByIdService from "../../services/categoryService/getcategoryById.service.js";

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await getCategoryByIdService(id);

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get category by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default getCategoryById;
