import express from 'express'
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/taskController'
import { authenticate } from '../middleware/authMiddleware'


const router = express.Router()
router.use(authenticate)
router.post('/', createTask)
router.get('/', getAllTasks)
router.get('/:id', getTaskById)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
