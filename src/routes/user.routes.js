import { Router } from "express";
import { logOutUser, loginUser, verifyLogin } from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.midlleware.js"


const router = Router()

router.route("/login").post(loginUser)

//secured routes
router.route("/verify").post(verifyJWT, verifyLogin)

router.route("/logout").post(verifyJWT, logOutUser)
export default router



