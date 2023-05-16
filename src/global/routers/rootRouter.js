import express from "express";
import { getHome, posthome } from "../../song/controllers/songController";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome).post(posthome);

// rootRouter.route("/join").get(getHome).post(posthome);

// rootRouter.route("/login").get(getHome).post(posthome);

// rootRouter.route("/search").get(getHome).post(posthome);


export default rootRouter;
