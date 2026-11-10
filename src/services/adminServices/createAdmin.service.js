
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../model/admin.model.js";

export const createAdminService = async ({
  name,
  email,
  password,
  phone,
}) => {
  // Check if email already exists
  const existingAdmin = await Admin.findOne({
    email: email.trim().toLowerCase(),
  });

  if (existingAdmin) {
    const error = new Error("Email already exists.");
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create admin
  const admin = await Admin.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hashedPassword,
    phone,
  });

  // Generate JWT
  const token = jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Return token and safe user details
  return {
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
    },
  };
};
