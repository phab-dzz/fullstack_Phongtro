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
            url: `/api/v1/post/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})