import crypto from "crypto";
import bcrypt from "bcryptjs";
import Admin from "../../model/admin.model.js";
import ApiError from "../../utils/ApiError.js";

const resetPasswordService = async (email, resetToken, newPassword) => {
    const normalizedEmail = email?.trim().toLowerCase();

    if (
        !normalizedEmail ||
        typeof resetToken !== "string" ||
        !resetToken ||
        typeof newPassword !== "string" ||
        !newPassword
    ) { throw new ApiError(
            400,
            "Email, reset token, and new password are required"
        );
    }

    if (newPassword.length < 8) {
        throw new ApiError(
            400,
            "Password must be at least 8 characters long"
        );
    }

    const tokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const admin = await Admin.findOne({
        email: normalizedEmail,
    }).select(
        "+resetPasswordTokenHash " +
        "+resetPasswordTokenExpires"
    );

    if (
        !admin ||
        !admin.resetPasswordTokenHash ||
        !admin.resetPasswordTokenExpires ||
        admin.resetPasswordTokenExpires <= new Date()
    ) {
        throw new ApiError(
            400,
            "Reset token is invalid or expired. Please verify your OTP again"
        );
    }

    const storedHash = Buffer.from(
        admin.resetPasswordTokenHash,
        "hex"
    );
    const submittedHash = Buffer.from(tokenHash, "hex");

    const matches =
        storedHash.length === submittedHash.length &&
        crypto.timingSafeEqual(storedHash, submittedHash);

    if (!matches) {
        throw new ApiError(400, "Invalid reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Atomically consume the token while changing the password.
    const result = await Admin.updateOne(
        {
            _id: admin._id,
            resetPasswordTokenHash: tokenHash,
            resetPasswordTokenExpires: { $gt: new Date() },
        },
        {
            $set: {
                password: hashedPassword,
                resetPasswordOtp: null,
                resetPasswordOtpExpires: null,
                resetPasswordOtpAttempts: 0,
                resetPasswordVerified: false,
                resetPasswordTokenHash: null,
                resetPasswordTokenExpires: null,
            },
        }
    );

    if (result.modifiedCount !== 1) {
        throw new ApiError(
            400,
            "Reset token is invalid or expired. Please try again"
        );
    }

    return {
        message: "Password reset successfully",
    };
};

export default resetPasswordService;

