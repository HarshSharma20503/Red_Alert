import { Router } from "express";
import { registerUser, loginUser, confirmEmail } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/signUp").post(registerUser);
router.route("/confirmEmail/:id").get(confirmEmail);
router.route("/login").post(loginUser);

export default router;
