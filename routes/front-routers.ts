import express from "express";
const router = express.Router();
import {
  mainPage,
  registerPage,
} from "../controllers/front-routers";

router.route("/").get(mainPage);
router.route("/register").get(registerPage);
router.route("/video").get(mainPage);

export default router;
