import express from 'express';
import * as categoryController from '../controllers/category.js';
const router = express.Router();

router.get('/all', categoryController.getCategories);

export default router;