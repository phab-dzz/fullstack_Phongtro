import express from 'express';
import * as authController from '../controllers/auth';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.use(verifyToken);
router.post('/change-password', authController.changePassword);


export default router 