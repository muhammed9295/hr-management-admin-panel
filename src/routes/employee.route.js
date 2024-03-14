import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addEmployees, getEmployees, getSingleEmployee } from "../controllers/employes.controller.js"

const router = Router();

// secured routes
router.route("/add-employee").post(verifyJWT, upload.fields([{name:"avatar", maxCount:1}]), addEmployees);
router.route("/get-employees").get(verifyJWT, getEmployees)
router.route("/get-profile/:id").get(verifyJWT, getSingleEmployee)


export default router;