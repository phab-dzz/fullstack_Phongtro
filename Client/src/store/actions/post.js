import actionTypes from './actionTypes';
import { apiGetPost, apiGetPostLimit,apiGetNewPosts,apiGetPostById } from '../../services/post';
export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPost()
        console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null
        })
    }
}
export const getPostsLimit = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostLimit(query)


        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })
    }
}
export const getNewPosts = () => async (dispatch) => {
    try{
        const response = await  apiGetNewPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }

    }catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: null
        })
    }}
export const getPostById = (id) => async (dispatch) => {
    try {
        const response = await apiGetPostById(id)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POST_BY_ID,
                post: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POST_BY_ID,
                msg: response.data.msg,
                post: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST_BY_ID,
            post: null
        })
    }
}