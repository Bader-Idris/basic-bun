import express from "express";
const router = express.Router();
import {
  signUpController,
  logInController,
} from "../controllers/signUp";

// import authenticateUser from "../middleware/authentication";
// import rateLimiter from "express-rate-limit";


// const apiLimiter = rateLimiter({
//   windowMs: 15 * 60 * 1000, //m * seconds *ms
//   max: 20,
//   message: {
//     msg: "Too many requests from this IP, please try again after 15 minutes",
//   },
// });
// const { register, login } = require('../controllers/auth');


// router.route("/signup").get(loginPage);//.post(signUpController);
router.route("/signup").post(signUpController);
router.route("/login").post(logInController);

// router.post('/register', apiLimiter, register);
// router.post('/login', apiLimiter, login);
export default router;
