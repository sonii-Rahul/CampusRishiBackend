import { Router } from "express";
import {tenentregister} from "../controllers/tenent.controler.js"


const router = Router()

router.route("/tenentRegister").post(tenentregister)
export default router
