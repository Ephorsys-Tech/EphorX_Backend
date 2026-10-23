import { createAdminService } from "../../services/adminServices/createAdmin.service.js";

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const { token, admin } = await createAdminService({
      name,
      email,
      password,
      phone,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: admin,
    });
  } 
  catch (error) {
  console.error("Create admin error:", error);
  console.error("Error message:", error.message);
  console.error("Error stack:", error.stack);

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Email already exists."
    });
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}
  
};