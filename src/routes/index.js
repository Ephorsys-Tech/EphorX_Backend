import express from "express";
import authRoutes from "../routes/auth.routes.js";
import courseRoutes from "../routes/course.routes.js"
import categoryRoutes from "../routes/category.routes.js"
import contactRoutes from "../routes/contact.routes.js"
import webinarRoutes from "../routes/webinar.routes.js"
import trainerRoutes from "../routes/trainer.routes.js"

const router = express.Router();

// ========================================
// Admin Routes
// ========================================
router.use("/admin", authRoutes);
router.use("/admin/courses",courseRoutes);
router.use("/category",categoryRoutes);
router.use("/contact",contactRoutes);
router.use("/webinars",webinarRoutes);
router.use("/trainer",trainerRoutes);


export default router;
