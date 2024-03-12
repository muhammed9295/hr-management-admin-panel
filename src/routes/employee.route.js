import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addEmployees } from "../controllers/employes.controller.js"

const router = Router();

// secured routes
router.route("/add-employee").post(verifyJWT, upload.fields([{name:"avatar", maxCount:1}]), addEmployees);

export default router;