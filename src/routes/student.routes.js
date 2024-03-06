import { Router } from "express";
import {StudentRegister} from "../controllers/student.controler.js"


const router = Router()

router.route("/studentRegister").post(StudentRegister)
export default router
