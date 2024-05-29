import { Router } from "express";
import { registerCourse } from "../controllers/course.controler.js";
import { getCoursesBySchool } from "../controllers/course.controler.js";
import {getCoursesBySchoolId} from "../controllers/course.controler.js"


const router = Router()

router.route("/courseRegister").post(registerCourse)
router.route("/getcourses").post(getCoursesBySchool)
router.route("/getcoureid").post(getCoursesBySchoolId )

export default router
