import adminLogoutService from "../../services/adminServices/adminLogout.service.js";

const adminLogout = async (req, res) => {
  try {
    const result = await adminLogoutService();

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Admin logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default adminLogout;
