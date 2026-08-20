import express from "express";
import { getPublicPortfolio } from "../controller/portfolio.controller.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/public", getPublicPortfolio);

export default portfolioRouter;
