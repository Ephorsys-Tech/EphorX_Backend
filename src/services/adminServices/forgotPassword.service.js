import crypto from "crypto";
import Admin from "../../model/admin.model.js";
import ApiError from "../../utils/ApiError.js";
import sendEmail from "../../utils/sendEmail.js";


const forgotPasswordService = async (email) => {
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
        throw new ApiError(400, "Email is required");
    }

    const admin = await Admin.findOne({
        email: normalizedEmail,
    });

    // Use a generic response so callers cannot easily
    // discover which email addresses have accounts.
    const response = {
        message: "If an account exists, an OTP will be sent.",
    };

    if (!admin) {
        return response;
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    const secret = process.env.RESET_OTP_SECRET;
    if (!secret) {
        throw new Error("RESET_OTP_SECRET is not configured");
    }

    const otpHash = crypto
        .createHmac("sha256", secret)
        .update(otp)
        .digest("hex");

    const expiresInMinutes = Number(
        process.env.OTP_EXPIRES_IN_MINUTES || 10
    );

    if (
        !Number.isFinite(expiresInMinutes) ||
        expiresInMinutes <= 0
    ) {
        throw new Error("Invalid OTP expiration configuration");
    }

    admin.resetPasswordOtp = otpHash;
    admin.resetPasswordOtpExpires = new Date(
        Date.now() + expiresInMinutes * 60 * 1000
    );
    admin.resetPasswordOtpAttempts = 0;
    admin.resetPasswordVerified = false;
    admin.resetPasswordTokenHash = null;
    admin.resetPasswordTokenExpires = null;

    await admin.save();

    try {
        await sendEmail({
            to: admin.email,
            subject: "EPhorX Password Reset OTP",
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Password Reset</h2>
                    <p>Hello ${admin.name},</p>
                    <p>Your password reset OTP is:</p>
                    <h1 style="letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP expires in ${expiresInMinutes} minutes.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
            `,
        });
    } catch (error) {
        // Invalidate the OTP if email delivery fails.
        admin.resetPasswordOtp = null;
        admin.resetPasswordOtpExpires = null;
        admin.resetPasswordOtpAttempts = 0;
        await admin.save();

        throw error;
    }

    return response;
};

export default forgotPasswordService;
