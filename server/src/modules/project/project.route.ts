import { Router } from 'express';
import { getProjects, getSingleProject, createProject, updateProject, deleteProject } from './project.controller';
import { protect } from '../../middlewares/authMiddlewares';

const router = Router();

router.use(protect)
router.route('/').post(createProject).get(getProjects);
router.route('/:id').get(getSingleProject).put(updateProject).delete(deleteProject)

export default router;