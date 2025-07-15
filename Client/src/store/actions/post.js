import actionTypes from './actionTypes';
import { apiGetPost, apiGetPostLimit,apiGetNewPosts,apiGetPostById,apiGetPostOfCurrent,apiCreatePost } from '../../services/post';
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
export const getPostOfCurrent = () => async (dispatch) => {
    try {
        const response = await apiGetPostOfCurrent()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POST_OF_CURRENT,
                postOfCurrent: response.data.response.rows
            })
        } else {
            dispatch({
                type: actionTypes.GET_POST_OF_CURRENT,
                msg: response.data.msg,
                postOfCurrent: []
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST_OF_CURRENT,
            postOfCurrent: []
        })
    }
}
export const createPost = (payload) => async (dispatch) => {
    try {
        const response = await apiCreatePost(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_CREATED,
                post: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_CREATED,
                msg: response.data.msg,
                post: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_CREATED,
            post: null
        })
    }
}