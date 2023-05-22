import express from "express";
import { getHome } from "../controllers/homeController";

const rootRouter = express.Router();

rootRouter.get("/", getHome)

// rootRouter.route("/join").get(getHome).post(posthome);

// rootRouter.route("/login").get(getHome).post(posthome);

// rootRouter.route("/search").get(getHome).post(posthome);


export default rootRouter;
