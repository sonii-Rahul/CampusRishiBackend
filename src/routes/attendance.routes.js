import { Router } from "express";
import{Studentattendance,getAttendance } from "../controllers/attendance.controler.js"

const router = Router()

router.route("/takeattendance").post(Studentattendance)
router.route("/getattendance").get(getAttendance )
export default router
