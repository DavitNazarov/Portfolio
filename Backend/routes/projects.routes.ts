import express from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../controller/projects.controller.js";
import { loggedInUser } from "../middleware/auth.middleware.js";
const projectsRouter = express.Router();

projectsRouter.get("/public", getAllProjects);
projectsRouter.post("/create-project", loggedInUser, createProject);
projectsRouter.get("/get-all-projects", loggedInUser, getAllProjects);

projectsRouter.patch("/update-project/:id", loggedInUser, updateProject);
projectsRouter.delete("/delete-project/:id", loggedInUser, deleteProject);

export default projectsRouter;
