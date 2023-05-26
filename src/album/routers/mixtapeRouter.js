import express from "express";
import { getMixtapeInfo } from "../controllers/mixtapeController";

const mixtapeRouter = express.Router();

mixtapeRouter.get(":id", getMixtapeInfo);

export default mixtapeRouter;