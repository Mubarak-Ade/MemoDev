import { Router } from 'express'
import {
    getProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject,
    GetProjectDetails,
} from './project.controller'
import { protect } from '../../middlewares/authMiddlewares'

const router = Router()

router.use(protect)

router.route('/').post(createProject).get(getProjects)
router.route('/:slug/snippets').get(GetProjectDetails)
router.route('/:id').get(getSingleProject).put(updateProject).delete(deleteProject)

export default router
