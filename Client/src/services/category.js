import axiosConfig from "../axiosConfig";


export const apigetcategories = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/all',

        })
        console.log(response)
        resolve(response)


    } catch (error) {
        reject(error)
    }
})