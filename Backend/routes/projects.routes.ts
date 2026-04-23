import express from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controller/projects.controller.js";
import { loggedInUser, requireAdmin } from "../middleware/auth.middleware.js";
const projectsRouter = express.Router();

projectsRouter.get("/public", getAllProjects);
projectsRouter.post("/create-project", loggedInUser, requireAdmin, createProject);
projectsRouter.get("/get-all-projects", loggedInUser, requireAdmin, getAllProjects);

projectsRouter.patch("/update-project/:id", loggedInUser, requireAdmin, updateProject);
projectsRouter.delete("/delete-project/:id", loggedInUser, requireAdmin, deleteProject);

export default projectsRouter;
