import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import * as userController from '../controllers/user.js'

const router = express.Router()

router.use(verifyToken)
router.get('/get-current', userController.getCurrent)
router.put('/update-user', userController.updateUser)


export default router