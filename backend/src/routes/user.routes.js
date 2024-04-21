import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCompany, getUser, removeStock, updateCompanyStock } from "../controllers/user.controllers.js";

const router = Router();

router.route("/").get(verifyJWT, getUser);
router.route("/addCompany").post(verifyJWT, addCompany);
router.route("/updateCompanyStock").post(verifyJWT, updateCompanyStock);
router.route("/deleteCompanyStock").post(verifyJWT, removeStock);

export default router;
