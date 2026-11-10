import express from "express";
import { createContact } from "../controllers/contactControllers/createContact.controller.js";
import { getContacts } from "../controllers/contactControllers/getContact.controller.js";
import { getContactById } from "../controllers/contactControllers/getContactById.controller.js";
import { updateContact } from "../controllers/contactControllers/updateContact.controller.js";
import { deleteContact } from "../controllers/contactControllers/deleteContact.controller.js";
import validateContact from "../validators/contactValidator/createContact.validator.js";



const router = express.Router();

router.post("/create-contact", validateContact,createContact);
router.get("/get-all-contact", getContacts);
router.get("/get-contact/:id", getContactById);
router.patch("/update-contact/:id", updateContact);
router.delete("/delete-contact/:id", deleteContact);

export default router;