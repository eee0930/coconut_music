import express from "express";
import { getAddMember, postAddMember, getLogin, postLogin, postLogout } from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/join").get(getAddMember).post(postAddMember);
authRouter.route("/login").get(getLogin).post(postLogin);
authRouter.post("/logout", postLogout);

export default authRouter;