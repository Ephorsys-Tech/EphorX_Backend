import Category from "../../model/category.model.js";


const getAllCategoriesService = async () => {
  const categories = await Category.find()
    .sort({ createdAt: -1 })
    .lean();

  return categories;
};

export default getAllCategoriesService;
