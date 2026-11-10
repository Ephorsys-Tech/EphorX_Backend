import crypto from "crypto";
import Admin from "../../model/admin.model.js";
import ApiError from "../../utils/ApiError.js";

const verifyOtpService = async (email, otp) => {
    const normalizedEmail = email?.trim().toLowerCase();
    const submittedOtp = String(otp ?? "").trim();

    if (
        !normalizedEmail ||
        !/^\d{6}$/.test(submittedOtp)
    ) {
        throw new ApiError(400, "Valid email and 6-digit OTP are required");
    }

    const admin = await Admin.findOne({
        email: normalizedEmail,
    }).select(
        "+resetPasswordOtp " +
        "+resetPasswordOtpExpires " +
        "+resetPasswordOtpAttempts " +
        "+resetPasswordVerified"
    );

    if (!admin || !admin.resetPasswordOtp) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    const now = new Date();

    if (
        !admin.resetPasswordOtpExpires ||
        admin.resetPasswordOtpExpires <= now
    ) {
        admin.resetPasswordOtp = null;
        admin.resetPasswordOtpExpires = null;
        admin.resetPasswordOtpAttempts = 0;
        admin.resetPasswordVerified = false;
        await admin.save();

        throw new ApiError(400, "OTP expired. Please request a new one");
    }

    if (admin.resetPasswordOtpAttempts >= 5) {
        throw new ApiError(
            429,
            "Too many incorrect attempts. Request a new OTP"
        );
    }

    const secret = process.env.RESET_OTP_SECRET;

    if (!secret) {
        throw new Error("RESET_OTP_SECRET is not configured");
    }

    const submittedHash = crypto
        .createHmac("sha256", secret)
        .update(submittedOtp)
        .digest();

    const storedHash = Buffer.from(
        admin.resetPasswordOtp,
        "hex"
    );

    const matches =
        submittedHash.length === storedHash.length &&
        crypto.timingSafeEqual(submittedHash, storedHash);

    if (!matches) {
        admin.resetPasswordOtpAttempts += 1;
        await admin.save();

        throw new ApiError(
            400,
            "Invalid OTP"
        );
    }

    // Generate a separate token for the password-reset request.
    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const expiresInMinutes = Number(
        process.env.RESET_TOKEN_EXPIRES_IN_MINUTES || 10
    );

    if (
        !Number.isFinite(expiresInMinutes) ||
        expiresInMinutes <= 0
    ) {
        throw new Error("Invalid reset-token expiration configuration");
    }

    // Consume the OTP after successful verification.
    admin.resetPasswordOtp = null;
    admin.resetPasswordOtpExpires = null;
    admin.resetPasswordOtpAttempts = 0;
    admin.resetPasswordVerified = true;
    admin.resetPasswordTokenHash = resetTokenHash;
    admin.resetPasswordTokenExpires = new Date(
        Date.now() + expiresInMinutes * 60 * 1000
    );

    await admin.save();

    return {
        message: "OTP verified successfully",
        resetToken,
        expiresInMinutes,
    };
};

export default verifyOtpService;
