import { Router } from "express";
import {teacherRegister,fetchTeachersBySchoolId } from "../controllers/teacher.controler.js"



const router = Router()

router.route("/teacherregister").post(teacherRegister)
router.route("/fetchteacher").get(fetchTeachersBySchoolId)
export default router
