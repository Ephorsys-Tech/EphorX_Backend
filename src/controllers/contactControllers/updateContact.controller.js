import mongoose from "mongoose";
import { updateContactService } from "../../services/contactService/createContact.service.js";

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID",
      });
    }

    const allowedFields = [
      "name",
      "email",
      "phone",
      "whatsApp",
      "message",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (typeof req.body[field] !== "string") {
          return res.status(400).json({
            success: false,
            message: `${field} must be a string`,
          });
        }

        updates[field] = req.body[field].trim();
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    if (updates.name !== undefined && !updates.name) {
      return res.status(400).json({
        success: false,
        message: "Name cannot be empty",
      });
    }

    if (updates.email !== undefined) {
      updates.email = updates.email.toLowerCase();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }
    }

    if (updates.message !== undefined && !updates.message) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const limits = {
      name: 100,
      email: 254,
      phone: 10,
      whatsApp: 10,
      message: 5000,
    };

    for (const [field, value] of Object.entries(updates)) {
      if (value.length > limits[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} exceeds the maximum length`,
        });
      }
    }

    const contact = await updateContactService(id, updates);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};