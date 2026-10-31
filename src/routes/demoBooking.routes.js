import express from "express";

import createDemoBookingController from "../controllers/demoBooking/createDemo.controller.js"
import getAllDemoBooking from "../controllers/demoBooking/getAllDemo.controller.js"
import getDemoBookingByIdController from "../controllers/demoBooking/getByIdDemo.controller.js"
import updateDemoBookingController from "../controllers/demoBooking/updateDemo.controller.js"
import deleteDemoBookingController from "../controllers/demoBooking/deleteDemo.controller.js"

import { createDemoBookingValidator, 
         demoBookingIdValidator,
         updateDemoBookingValidator} from "../validators/demoBooking.validator.js";


const router = express.Router();

router.post(
  "/create-demo",
   createDemoBookingValidator,
  createDemoBookingController
);

router.get("/get-all-demo",getAllDemoBooking );

router.get(
  "/get-demo-by/:id",
  demoBookingIdValidator,
  getDemoBookingByIdController
);

router.put(
  "/update-demo/:id",
  demoBookingIdValidator,
  updateDemoBookingValidator,
  updateDemoBookingController
);

router.delete(
  "/delete-demo/:id",
  demoBookingIdValidator,
  deleteDemoBookingController
);

export default router;