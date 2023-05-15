import express from "express";
import { home, posthome } from "../../music/controllers/songController";

const rootRouter = express.Router();

rootRouter.route("/").get(home).post(posthome);

rootRouter.route("/join").get(home).post(posthome);

rootRouter.route("/login").get(home).post(posthome);

rootRouter.route("/search").get(home).post(posthome);


export default rootRouter;
