import { Router } from 'express';
import { searchController } from './search.controller';
import { protect } from '../../middlewares/authMiddlewares';

const router = Router();

router.use(protect)
router.route('/').get(searchController);

export default router;
