import express from "express";
import { loggedInUser, requireAdmin } from "../middleware/auth.middleware.js";
import {
  createExperience,
  getAllExperience,
  deleteExperience,
  updateExperience,
} from "../controller/experience.controller.js";
const experienceRouter = express.Router();

experienceRouter.get("/public", getAllExperience);
experienceRouter.post("/create-experience", loggedInUser, requireAdmin, createExperience);
experienceRouter.get("/get-all-experience", loggedInUser, requireAdmin, getAllExperience);

experienceRouter.patch(
  "/update-experience/:id",
  loggedInUser,
  requireAdmin,
  updateExperience
);
experienceRouter.delete(
  "/delete-experience/:id",
  loggedInUser,
  requireAdmin,
  deleteExperience
);
export default experienceRouter;
