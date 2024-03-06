import { Router } from "express";
import { registerClass } from "../controllers/class.controler.js";

const router = Router()

router.route("/classRegister").post(registerClass)
export default router
