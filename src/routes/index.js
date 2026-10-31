import express from "express";
import authRoutes from "../routes/auth.routes.js";
import courseRoutes from "../routes/course.routes.js"
import categoryRoutes from "../routes/category.routes.js"
import contactRoutes from "../routes/contact.routes.js"
import webinarRoutes from "../routes/webinar.routes.js"
import trainerRoutes from "../routes/trainer.routes.js"
import webinarEnrollRoutes from "../routes/webinarEnroll.routes.js"
import courseEnrollRoutes from "../routes/courseEnroll.routes.js"
import DemoBookingRoutes from "../routes/demoBooking.routes.js";
import syllabusLeadRoutes from "../routes/syllabusLead.routes.js"
import JobRoutes from "../routes/job.routes.js"

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
router.use("/webinarEnroll",webinarEnrollRoutes);
router.use("/courseEnroll",courseEnrollRoutes);
router.use("/book-demo",DemoBookingRoutes);
router.use("/syllabus-lead",syllabusLeadRoutes);
router.use("/job",JobRoutes)


export default router;
