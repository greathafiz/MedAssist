import express from "express";
import {signupController, loginController, logoutController} from '../controllers/auth.js'

const router = express.Router();

router.post('/auth/signup', signupController)
router.post('/auth/login', loginController)
router.get('/auth/logout', logoutController)


export { router as authRouter };
