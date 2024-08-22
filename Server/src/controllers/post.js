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
    const { offset, ...query } = req.query
    console.log(req.query)



    try {

        const response = await postService.getPostLimitService(offset, query);
        return res.status(200).json(response)
    }
    catch {
        return res.status(500).json({
            err: -1,
            msg: 'fail in controller'
        })
    }
}