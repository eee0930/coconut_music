import express from "express";
import { mixtapeList, getMixtapeInfo } from "../controllers/mixtapeController";

const mixtapeRouter = express.Router();

mixtapeRouter.get("/", mixtapeList);
mixtapeRouter.get("/:id", getMixtapeInfo);

export default mixtapeRouter;