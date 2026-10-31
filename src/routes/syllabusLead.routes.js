import express from "express";

import createSyllabusLeadController from "../controllers/syllabusLeadControllers/createLead.controller.js"
import getAllSyllabusLeadsController from "../controllers/syllabusLeadControllers/getAllLead.controller.js"
import getSyllabusLeadByIdController from "../controllers/syllabusLeadControllers/getByIdLead.controller.js"
import updateSyllabusLeadController from "../controllers/syllabusLeadControllers/updateLead.controller.js"
import deleteSyllabusLeadController from "../controllers/syllabusLeadControllers/deleteLead.controller.js"

import {createSyllabusLeadValidator,
        syllabusLeadIdValidator,
        updateSyllabusLeadValidator} from "../validators/syllabusLead.validator.js"

const router = express.Router();

router.post(
  "/create-lead",
  createSyllabusLeadValidator,
  createSyllabusLeadController
);

router.get("/get-all-lead",getAllSyllabusLeadsController);

router.get(
  "/get-lead-by/:id",
syllabusLeadIdValidator ,
getSyllabusLeadByIdController
);

router.put(
  "/update-lead/:id",
  syllabusLeadIdValidator,
  updateSyllabusLeadValidator,
  updateSyllabusLeadController
);

router.delete(
  "/delete-lead/:id",
  syllabusLeadIdValidator,
  deleteSyllabusLeadController
);

export default router;