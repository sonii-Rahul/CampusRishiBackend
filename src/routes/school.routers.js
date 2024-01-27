import { Router } from "express";
import {Schoolregister} from "../controllers/school.controler.js"


const router = Router()

router.route("/schoolRegister").post(Schoolregister)
export default router
