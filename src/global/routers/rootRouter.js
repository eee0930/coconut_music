import express from "express";
import { home, posthome } from "../../music/controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/", posthome);

rootRouter.get("/join", home);
rootRouter.post("/join", home);

rootRouter.get("/login", home);
rootRouter.post("/login", home);

rootRouter.get("/search", home);
rootRouter.post("/search", home);


export default rootRouter;
