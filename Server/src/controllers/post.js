import { query } from 'express';
import * as postService from '../services/post.js';

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
     const { page, priceNumber, areaNumber,isNewest, ...query } = req.query
    console.log("query from get post limit", query)

    try {

        const response = await postService.getPostLimitService(page, query,{ priceNumber, areaNumber, isNewest });
        return res.status(200).json(response)
    }
    catch(error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller'+ error
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
export const createNewPost = async (req, res) => {
   const {categoryCode,title,priceNumber,areaNumber,label}=req.body;
   if (!categoryCode || !title || !priceNumber || !areaNumber) {
        return res.status(400).json({
            err: -1,
            msg: 'missing required parameters'
        })
    }
   const {id}= req.user;
   console.log("body from create post in controller", req.body);
    try {
        const response = await postService.createNewPostService(req.body, id);
        // console.log("Response from create post", )
        return res.status(200).json(response)
    }
    catch(error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller' + error
        })
    }
}
export const getPostLimitAdmin = async (req, res) => {
    
    const { id } = req.user;
    // console.log("Id from get post limit admin", id)

    try {
        if (!id) {
            return res.status(400).json({
                err: -1,
                msg: 'missing user id'
            })
        }
        const response = await postService.getPostLimitAdminService(id);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller' + error
        })
    }
}
export const getdeletePostbyuserId = async (req, res) => {
    const { id } = req.user;
    const { postId } = req.params;
    console.log("Id from delete post by user", id)


    try {
        if (!id) {
            return res.status(400).json({
                err: -1,
                msg: 'missing user id'
            })
        }
        const response = await postService.deletePostService(postId,id);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller' + error
        })
    }
}
export const updatepostByadmin= async (req, res) => {
    const { id } = req.user;
    const { postId } = req.params;
    const data = req.body;
    console.log("Data from update post by admin", data)
    try {
        if (!id) {
            return res.status(400).json({
                err: -1,
                msg: 'missing user id'
            })
        }
        const response = await postService.updatePostServicebyadmin(data, postId);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: `fail in controller: ${error.message || error.toString()}`
        })
    }
}
export const  searchPost = async (req, res) => {
    const { query } = req;
    console.log("query from search post", query)
    try {
        const response = await postService.searchPostService(query);
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller' + error
        })
    }
}