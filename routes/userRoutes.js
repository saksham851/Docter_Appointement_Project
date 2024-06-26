import express from 'express'
import { loginController, registerController,authController } from '../controllers/userController.js';
import authenticate from '../middleware/authMiddleware.js';

const router=express.Router();

//routes
router.post('/login',loginController)
router.post('/register',registerController)


router.post('/getUserData',authenticate,authController)
export {router};