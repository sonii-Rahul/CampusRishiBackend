import { Router } from "express";
import { registerCourse } from "../controllers/course.controler.js";


const router = Router()

router.route("/courseRegister").post(registerCourse)
export default router
