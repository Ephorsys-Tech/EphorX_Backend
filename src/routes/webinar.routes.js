import express from "express";
import { validateCreateWebinar } from "../validators/webinarValidator/createWebinar.validator.js";
import { createWebinar } from "../controllers/webinarControllers/createWebinar.controller.js";
import getAllWebinarsController from "../controllers/webinarControllers/getAllWebinar.controller.js";
import webinarIdValidator from "../validators/webinarValidator/webinarId.validator.js";
import getWebinarByIdController from "../controllers/webinarControllers/getWebinarById.controller.js";
import updateWebinarController from "../controllers/webinarControllers/updateWebinar.controller.js";
import updateWebinarValidator from "../validators/webinarValidator/updateWebinar.validator.js";
import deleteWebinarController from "../controllers/webinarControllers/deleteWebinar.controller.js";


const router = express.Router();

router.post("/create-webinar", validateCreateWebinar, createWebinar);
router.get("/get-all-webinar", getAllWebinarsController);
router.get("/get-webinar/:id",webinarIdValidator,getWebinarByIdController);
router.patch("/update-webinar/:id",webinarIdValidator,updateWebinarValidator,updateWebinarController);
router.delete("/delete-webinar/:id",webinarIdValidator,deleteWebinarController);

export default router;