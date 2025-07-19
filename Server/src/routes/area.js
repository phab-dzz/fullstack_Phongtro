import express from 'express';
import * as AreaController from '../controllers/area.js';
const router = express.Router();
router.get('/all', AreaController.getAreas);

export default router;