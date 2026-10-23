import verifyOtpService from "../../services/adminServices/verifyResetOtp.service.js";


const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (
            typeof email !== "string" ||
            typeof otp !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required.",
            });
        }

        const result = await verifyOtpService(email, otp);

        return res.status(200).json({
            success: true,
            message: result.message,
            resetToken: result.resetToken,
            expiresInMinutes: result.expiresInMinutes,
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        console.error("Verify OTP error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export default verifyOtp;
