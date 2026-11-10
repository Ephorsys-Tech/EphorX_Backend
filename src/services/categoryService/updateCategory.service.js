
import Category from "../../model/category.model.js";

const updateCategoryService = async (id, updateData) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedCategory;
};

export default updateCategoryService;
