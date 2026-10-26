import jwt from "jsonwebtoken";
import Admin from "../model/admin.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please log in first",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id).select("_id email");

        if (!admin) {
            return res.status(401).json({
                message: "Admin not found",
            });
        }

        req.admin = admin;

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};




