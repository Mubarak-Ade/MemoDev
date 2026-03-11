import { Router } from 'express';
import { forgotPassword, getUser, login, logout, refresh, resetPassword, signup, verifyEmail } from './auth.controller';
import { protect } from '../../middlewares/authMiddlewares';
import { loginLimiter, passwordLimiter, signupLimiter } from '../../utils/rateLimiter';

const router = Router();

router.route('/signup').post(signupLimiter, signup);
router.route('/login').post(loginLimiter, login);
router.route('/refresh').post(refresh);
router.route('/verify').get(verifyEmail);
router.route('/logout').post(logout);
router.route('/forgot-password').post(passwordLimiter, forgotPassword);
router.route('/reset-password').post(passwordLimiter, resetPassword);
router.use(protect)
router.route('/me').get(getUser);

export default router;