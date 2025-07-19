import express from 'express';
import * as postController from '../controllers/post.js';
import verifyToken from '../middlewares/verifyToken.js';
const router = express.Router();
router.get('/all', postController.getPosts);
router.get('/limit', postController.getPostLimit);
router.get('/new-post', postController.getNewPosts);
router.get('/postbyid/:id', postController.getPostById);
router.get('/search', postController.searchPost);

router.use(verifyToken)
router.post('/create-new', postController.createNewPost);
router.get('/by-admin', postController.getPostLimitAdmin);
router.delete('/delete/:postId', postController.getdeletePostbyuserId);
router.put('/update/:postId', postController.updatepostByadmin);
export default router;