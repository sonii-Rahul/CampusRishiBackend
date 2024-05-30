import { Router } from "express";
import { logOutUser, loginUser, verifyLogin,challenge,challengeverify,loginchallenge,loginchallengeverify } from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.midlleware.js"


const router = Router()

router.route("/login").post(loginUser)
router.route("/loginchallenge").post(loginchallenge)
router.route("/verifyloginchallenege").post(loginchallengeverify)


//secured routes
router.route("/verify").post(verifyJWT, verifyLogin)
router.route("/register-challenge").post(verifyJWT,challenge)
router.route("/register-challengeverify").post(verifyJWT,challengeverify)

router.route("/logout").post(verifyJWT, logOutUser)

export default router


    
