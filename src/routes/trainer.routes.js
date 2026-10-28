
import express from "express";

import createTrainerValidator from "../validators/trainerValidator/createTrainer.validator.js";
import createTrainerController from "../controllers/trainerControllers/create.controller.js";

import getAllTrainersController from "../controllers/trainerControllers/getAllTrainers.controller.js";
import trainerIdValidator from "../validators/trainerValidator/getTrainerId.validator.js";

import getTrainerByIdController from "../controllers/trainerControllers/getTrainerById.controller.js";
import updateTrainerValidator from "../validators/trainerValidator/updateTrainer.validator.js";

import updateTrainerController from "../controllers/trainerControllers/updateTrainer.controller.js";
import deleteTrainerController from "../controllers/trainerControllers/deleteTrainer.controller.js";


const router = express.Router();

router.post( "/create-trainer",createTrainerValidator,createTrainerController);
router.get("/get-all-trainers", getAllTrainersController);
router.get("/get-trainer/:id", trainerIdValidator, getTrainerByIdController);
router.patch("/update-trainer/:id",updateTrainerValidator,updateTrainerController);
router.delete("/delete-trainer/:id",trainerIdValidator,deleteTrainerController);

export default router;
