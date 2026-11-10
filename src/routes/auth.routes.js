import express from "express";

import createAdminValidator from "../validators/createAdmin.validator.js";
import { createAdmin } from "../controllers/adminControllers/createAdmin.controller.js";

import adminLogin from "../controllers/adminControllers/adminLogin.controller.js";
import adminLoginValidator from "../validators/adminLogin.validator.js";

import adminLogout from "../controllers/adminControllers/adminLogout.controller.js";

import forgotPassword from "../controllers/adminControllers/forgotPassword.controller.js";
import verifyOtp from "../controllers/adminControllers/verifyResetOtp.controller.js";
import resetPassword from "../controllers/adminControllers/resetPassword.controller.js";


const router = express.Router();

router.post('/register',createAdminValidator,createAdmin)
router.post('/login',adminLoginValidator,adminLogin)
router.post('/logout',adminLogout)

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;