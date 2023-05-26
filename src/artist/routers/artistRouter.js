import express from "express";
import { getArtistInfo } from "../controllers/artistController";

const artistRouter = express.Router();

artistRouter.get("/:id", getArtistInfo);

export default artistRouter;