import express from "express";
import { createEnrollmentValidator } from "../validators/webinarEnrollmentValidator/createEnrollment.validator.js";
import { createEnrollmentController } from "../controllers/webinarEnrollmentControllers/createEnrollment.controller.js";
import { getAllEnrollmentsController } from "../controllers/webinarEnrollmentControllers/getAllEnrollments.controller.js";
import { getEnrollmentByIdController } from "../controllers/webinarEnrollmentControllers/getEnrollmentById.controller.js";
import { updateEnrollmentController } from "../controllers/webinarEnrollmentControllers/updateEnrollment.controller.js";
import { deleteEnrollmentValidator } from "../validators/webinarEnrollmentValidator/deleteEnrollment.validator.js";
import { deleteEnrollmentController } from "../controllers/webinarEnrollmentControllers/deleteEnrollment.controller.js";
import { updateEnrollmentValidators } from "../validators/courseEnrollmentValidator/updateEnrollment.validator.js";

const router = express.Router();


router.post("/create-web-enroll",createEnrollmentValidator,createEnrollmentController);
router.get("/get-all-webenroll",getAllEnrollmentsController);
router.get("/get-webenroll-by/:id",getEnrollmentByIdController);
router.patch("/update-webenroll/:id",updateEnrollmentValidators,updateEnrollmentController);
router.delete("/delete-webenroll/:id",deleteEnrollmentValidator,deleteEnrollmentController);



export default router;
