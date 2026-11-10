import express from "express";

import {createEnrollmentController} from "../controllers/courseEnrollmentControllers/createEnrollment.controller.js";
import { createEnrollmentValidators } from "../validators/courseEnrollmentValidator/createEnrollment.validator.js";

import {getAllEnrollmentsController} from "../controllers/courseEnrollmentControllers/getAllEnrollment.controller.js";
import {getEnrollmentByIdController} from "../controllers/courseEnrollmentControllers/getEnrollmentById.controller.js";

import {updateEnrollmentController} from "../controllers/courseEnrollmentControllers/updateEnrollment.controller.js";
import { updateEnrollmentValidators } from "../validators/courseEnrollmentValidator/updateEnrollment.validator.js";

import {deleteEnrollmentController} from "../controllers/courseEnrollmentControllers/deleteEnrollment.controller.js";
import { deleteEnrollmentValidators } from "../validators/courseEnrollmentValidator/deleteEnrollment.validator.js";



const router = express.Router();

router.post("/create-course-enroll",createEnrollmentValidators,createEnrollmentController);

router.get("/get-all-courseenroll",getAllEnrollmentsController);

router.get("/get-courseenroll-by/:id",getEnrollmentByIdController);

router.patch("/update-courseenroll/:id",updateEnrollmentValidators,updateEnrollmentController);

router.delete("/delete-courseenroll/:id",deleteEnrollmentValidators,deleteEnrollmentController);


export default router;
