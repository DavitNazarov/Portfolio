import express from "express";
import { loggedInUser } from "../middleware/auth.middleware.js";
import {
  createExperience,
  getAllExperience,
  deleteExperience,
  updateExperience,
} from "../controller/experience.controller.js";
const experienceRouter = express.Router();

experienceRouter.get("/public", getAllExperience);
experienceRouter.post("/create-experience", loggedInUser, createExperience);
experienceRouter.get("/get-all-experience", loggedInUser, getAllExperience);

experienceRouter.patch(
  "/update-experience/:id",
  loggedInUser,
  updateExperience
);
experienceRouter.delete(
  "/delete-experience/:id",
  loggedInUser,
  deleteExperience
);
export default experienceRouter;
