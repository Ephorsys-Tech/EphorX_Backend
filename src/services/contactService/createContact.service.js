import Contact from "../../model/contact.model.js";

// Create
export const createContactService = (data) =>
  Contact.create(data);

// Read all
export const getContactsService = () =>
  Contact.find().sort({ createdAt: -1 });

// Read one
export const getContactByIdService = (id) =>
  Contact.findById(id);

// Update
export const updateContactService = (id, data) =>
  Contact.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

// Delete
export const deleteContactService = (id) =>
  Contact.findByIdAndDelete(id);