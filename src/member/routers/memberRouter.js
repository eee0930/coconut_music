import express from "express";
import { getPlayListArchive } from "../controllers/archiveController";
import { memberOnlyMiddleware } from "../../middlewares";

const memberRouter = express.Router();

memberRouter.route("/archive").all(memberOnlyMiddleware).get(getPlayListArchive);

export default memberRouter;