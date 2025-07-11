import express from 'express';
import * as postController from '../controllers/post';
const router = express.Router();
router.get('/all', postController.getPosts);
router.get('/limit', postController.getPostLimit);
router.get('/new-post', postController.getNewPosts);
router.get('/:id', postController.getPostById);
export default router;