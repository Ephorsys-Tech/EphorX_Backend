import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../model/admin.model.js";

const loginService = async ({ email, password }) => {

  // Find admin by email
  const admin = await Admin.findOne({ 
    email: email.trim().toLowerCase()
   }).select("+password");

  if (!admin) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  // Ensure JWT secret exists
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
      algorithm: "HS256",
    }
  );

  // Never return the password
  return {
    token,
    admin: {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
    },
  };
};

export default loginService;
