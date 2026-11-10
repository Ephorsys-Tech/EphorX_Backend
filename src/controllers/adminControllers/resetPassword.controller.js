import resetPasswordService from "../../services/adminServices/resetPassword.service.js";

const resetPassword = async (req, res) => {
    try {
        const { email, resetToken, newPassword } = req.body;

        if (
            typeof email !== "string" ||
            typeof resetToken !== "string" ||
            typeof newPassword !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Email, reset token, and new password are required.",
            });
        }

        const result = await resetPasswordService(
            email,
            resetToken,
            newPassword
        );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        console.error("Reset password error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export default resetPassword;
