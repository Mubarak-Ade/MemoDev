import { Router } from 'express';
import { dashboardController } from './dashboard.controller';

const router = Router();

router.route('/').get(dashboardController);

export default router;