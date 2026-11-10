
import express from "express";

import createCollegeTieUpController from "../controllers/collegetieUpControllers/create.controller.js";
import getAllCollegeTieUpsController from "../controllers/collegetieUpControllers/getAllCollege.controller.js";
import getCollegeTieUpByIdController from "../controllers/collegetieUpControllers/getCollegeById.controller.js";
import updateCollegeTieUpController from "../controllers/collegetieUpControllers/updateCollege.controller.js";
import deleteCollegeTieUpController from "../controllers/collegetieUpControllers/deleteCollege.controller.js";

import {createCollegeTieUpValidator,updateCollegeTieUpValidator,collegeTieUpIdValidator} from "../validators/collegeTieUp.validator.js";
import collegeTieUpUpload from "../middleware/uploadCollegeLogo.middleware.js";


const router = express.Router();

// CREATE
router.post(
  "/create",
  collegeTieUpUpload,
  createCollegeTieUpValidator,
  createCollegeTieUpController
);

// GET ALL
router.get(
  "/get-all",
  getAllCollegeTieUpsController
);

// GET BY ID
router.get(
  "/get/:id",
  collegeTieUpIdValidator,
  getCollegeTieUpByIdController
);

// UPDATE
router.patch(
  "/update/:id",
  collegeTieUpIdValidator,
  collegeTieUpUpload,
  updateCollegeTieUpValidator,
  updateCollegeTieUpController
);

// DELETE
router.delete(
  "/delete/:id",
  collegeTieUpIdValidator,
  deleteCollegeTieUpController
);

export default router;
