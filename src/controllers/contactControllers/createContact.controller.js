import { createContactService } from "../../services/contactService/createContact.service.js";


export const createContact = async (req, res, next) => {
  try {
    const contact = await createContactService(req.body);

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};