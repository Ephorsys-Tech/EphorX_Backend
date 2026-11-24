import jwt from "jsonwebtoken";
import Admin from "../model/admin.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from HTTP-only cookie
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please log in first",
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find admin
        const admin = await Admin.findById(decoded.id).select(
            "_id email"
        );

        if (!admin) {
            return res.status(401).json({
                message: "Admin not found",
            });
        }

        // Attach admin to request
        req.admin = admin;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};