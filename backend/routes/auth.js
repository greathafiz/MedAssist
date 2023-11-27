import express from "express";
import {signupController, loginController} from '../controllers/auth.js'

const router = express.Router();

router.post('/auth/signup', signupController)
router.post('/auth/login', loginController)


export { router as authRouter };
