import { getContactsService } from "../../services/contactService/createContact.service.js";


export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getContactsService();

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};