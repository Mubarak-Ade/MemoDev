import { Router } from 'express';
import { getSnippets, getSingleSnippet, createSnippet, updateSnippet, deleteSnippet, getTags, getSnippetDetails, getLanguages, getDraftSnippets } from './snippet.controller';
import { protect } from '../../middlewares/authMiddlewares';

const router = Router();

router.use(protect)
router.route('/').get(getSnippets).post(createSnippet);
router.route('/drafts').get(getDraftSnippets)
router.route('/tags').get(getTags)
router.route('/langs').get(getLanguages)
router.route('/:slug/preview').get(getSnippetDetails)
router.route('/:id').get(getSingleSnippet).put(updateSnippet).delete(deleteSnippet)

export default router;