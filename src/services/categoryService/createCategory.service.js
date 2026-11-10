import Category from "../../model/category.model.js";

const createCategoryService = async (categoryData) => {
  const category = await Category.create(categoryData);
  return category;
};

export default createCategoryService;
