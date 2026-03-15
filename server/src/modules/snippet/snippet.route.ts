import { Router } from 'express';
import { getSnippets, getSingleSnippet, createSnippet, updateSnippet, deleteSnippet, getTags } from './snippet.controller';
import { protect } from '../../middlewares/authMiddlewares';

const router = Router();

router.use(protect)
router.route('/').get(getSnippets).post(createSnippet);
router.route('/tags').get(getTags)
router.route('/:id').get(getSingleSnippet).put(updateSnippet).delete(deleteSnippet)

export default router;