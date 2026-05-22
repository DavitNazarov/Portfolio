import express from "express";
import { loggedInUser, requireAdmin } from "../middleware/auth.middleware.js";
import {
  createAward,
  getAllAwards,
  updateAward,
  deleteAward,
} from "../controller/award.controller.js";

const awardRouter = express.Router();

awardRouter.get("/public", getAllAwards);
awardRouter.post("/create-award", loggedInUser, requireAdmin, createAward);
awardRouter.get("/get-all-awards", loggedInUser, requireAdmin, getAllAwards);
awardRouter.patch("/update-award/:id", loggedInUser, requireAdmin, updateAward);
awardRouter.delete("/delete-award/:id", loggedInUser, requireAdmin, deleteAward);

export default awardRouter;
