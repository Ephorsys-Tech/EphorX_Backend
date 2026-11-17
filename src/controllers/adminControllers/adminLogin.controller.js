
import loginService from "../../services/adminServices/loginAdmin.service.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const { token, admin } = await loginService({
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: admin,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default adminLogin;
