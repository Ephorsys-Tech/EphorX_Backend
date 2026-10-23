
import Category from "../../model/category.model.js";

const deleteCategoryService = async (id) => {
  const deletedCategory = await Category.findByIdAndDelete(id);

  return deletedCategory;
};

export default deleteCategoryService;
