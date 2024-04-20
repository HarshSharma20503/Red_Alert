import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCompany, getUser, updateCompanyStock } from "../controllers/user.controllers.js";

import {} from "../controllers/user.controllers.js";

const router = Router();

router.route("/").get(verifyJWT, getUser);
router.route("/addCompany").post(verifyJWT, addCompany);
router.route("/updateCompanyStock").post(verifyJWT, updateCompanyStock);

export default router;
