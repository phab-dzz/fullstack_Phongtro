import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiGetPost = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',

        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPostLimit = (query) => new Promise(async (resolve, reject) => {

    try {
        const response = await axiosConfig({
            method: 'get',
            // url: '/api/v1/post/limit?page=${page}',
            // url: `/api/v1/post/limit?offset=${query.offset}`,
            url: `/api/v1/post/limit`,
            params: query

        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/new-post',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }

})
export const apiUploadImages = (images) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
            data: images,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPostById = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/postbyid/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiCreatePost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/post/create-new',
            data: payload,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPostOfCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/by-admin',
           
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiDeletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/post/delete/${postId}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiUpdatePostByAdmin = (data, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/post/update/${id}`,
            data: data
        })
        console.log('response in update', response)
        resolve(response)
    } catch (error) {

        reject(error)
    }
})
export const apiGetPostsearch = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/search`,
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})