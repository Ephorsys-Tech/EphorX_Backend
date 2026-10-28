
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

import createCourse from "../controllers/courseControllers/createCourse.controller.js";
import getAllCourses from "../controllers/courseControllers/getAllCourses.controller.js";
import getCourseById from "../controllers/courseControllers/getCourseById.controller.js";
import updateCourse from "../controllers/courseControllers/updateCourse.controller.js";
import deleteCourse from "../controllers/courseControllers/deleteCourse.controller.js";

import createCourseValidator from "../validators/createCourse.validator.js";
import updateCourseValidator from "../validators/updateCourse.validator.js";
import deleteCourseValidator from "../validators/deleteCourse.validator.js";
import getCourseByIdValidator from "../validators/getCourseById.validator.js";

import courseUpload from "../middleware/courseUpload.middleware.js";

const router = express.Router();

// router.use(authMiddleware);

router.post(
  "/create-course",authMiddleware,courseUpload,createCourseValidator,createCourse);

router.get("/getAllCourses", getAllCourses);

router.get("/get-course-id/:id",getCourseByIdValidator,getCourseById);

router.patch("/update-course/:id",authMiddleware,courseUpload,updateCourseValidator,updateCourse);

router.delete("/delete-course/:id",authMiddleware,deleteCourseValidator,deleteCourse);

export default router;
