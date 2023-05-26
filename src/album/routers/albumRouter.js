import express from "express";
import { getAlbumInfo } from "../controllers/albumController";

const albumRouter = express.Router();

albumRouter.get(":id", getAlbumInfo);

export default albumRouter;