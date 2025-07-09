import { query } from 'express';
import * as postService from '../services/post';

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostService();
        return res.status(200).json(response)
    }
    catch {
        return res.status(500).json({
            err: -1,
            msg: 'fail'
        })
    }
}
export const getPostLimit = async (req, res) => {
    // const { offset, query } = req.query
     const { page, priceNumber, areaNumber, ...query } = req.query
    // console.log("page" + page, "query:" + query)


    try {

        const response = await postService.getPostLimitService(page, query,{ priceNumber, areaNumber });
        return res.status(200).json(response)
    }
    catch(error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller'
        })
    }
}
export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostsService();
        return res.status(200).json(response)
    }
    catch(error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller' + error
            
            
        })
    }
}
export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await postService.getPostByIdService(id);
        return res.status(200).json(response)
    }
    catch(error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller' + error
        })
    }
}