import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controllers.js";

import {} from "../controllers/user.controllers.js";

const router = Router();

router.route("/").get(verifyJWT, getUser);

export default router;
