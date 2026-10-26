
import Category from "../../model/category.model.js";

const getCategoryByIdService = async (id) => {
  const category = await Category.findById(id).lean();

  return category;
};

export default getCategoryByIdService;
