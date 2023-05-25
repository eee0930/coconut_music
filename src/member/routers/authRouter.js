import express from "express";
import { getAddMember, postAddMember } from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/join").get(getAddMember).post(postAddMember);

export default authRouter;