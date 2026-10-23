import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

import createCategory from "../controllers/categoryController/createCategory.controller.js";
import createCategoryValidator from "../validators/categoryValidator/createCategory.validator.js";

import getAllCategories from "../controllers/categoryController/getAllCategories.controller.js";

import getCategoryById from "../controllers/categoryController/getCategoryById.controller.js";
import getCategoryByIdValidator from "../validators/categoryValidator/getCategoryById.validator.js";

import updateCategory from "../controllers/categoryController/updateCategory.controller.js";
import updateCategoryValidator from "../validators/categoryValidator/updateCategory.validator.js";
import deleteCategory from "../controllers/categoryController/deletecategory.controller.js";
import deleteCategoryValidator from "../validators/categoryValidator/deleteCategory.validator.js";
import getCoursesByCategoryValidator from "../validators/categoryValidator/getCourseByCategory.validator.js";
import getCoursesByCategory from "../controllers/courseControllers/getCourseByCategory.controller.js";


const router = express.Router();

router.use(authMiddleware);

router.post("/create-category", createCategoryValidator, createCategory);
router.get("/get-all",getAllCategories);
router.get("/getById/:id", getCategoryByIdValidator, getCategoryById);
router.patch("/update/:id", updateCategoryValidator, updateCategory);
router.delete("/delete/:id", deleteCategoryValidator, deleteCategory);

router.get("/get-course/:id/courses", getCoursesByCategoryValidator, getCoursesByCategory);


export default router;
