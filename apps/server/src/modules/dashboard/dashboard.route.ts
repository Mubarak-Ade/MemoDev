import { Router } from 'express';
import { dashboardController } from './dashboard.controller';
import { protect } from '../../middlewares/authMiddlewares';

const router = Router();

router.use(protect)
router.route('/').get(dashboardController);

export default router;