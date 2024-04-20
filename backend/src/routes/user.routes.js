import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCompany, getUser } from "../controllers/user.controllers.js";

import {} from "../controllers/user.controllers.js";

const router = Router();

router.route("/").get(verifyJWT, getUser);
router.route("/addCompany").post(verifyJWT, addCompany);

export default router;
