import { Router } from "express";
import {teacherRegister} from "../controllers/teacher.controler.js"


const router = Router()

router.route("/teacherregister").post(teacherRegister)
export default router
