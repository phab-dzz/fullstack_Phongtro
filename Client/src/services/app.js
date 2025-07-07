
import axios from "../axiosConfig";
import axiosDefault from "axios";

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/price/all',
        })
        console.log("get prices la:"+response)
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetAreas = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/area/all',
        })
        console.log(response)
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/province/all',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: 'https://api.vnappmob.com/api/v2/province/',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
} )
export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://api.vnappmob.com/api/v2/province/district/${provinceId}`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})