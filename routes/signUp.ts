import express from "express";
const router = express.Router();
import { signUpController } from "../controllers/signUp";

router.route("/signup").get(signUpController);

export default router;
