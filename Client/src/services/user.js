import axios from "../axiosConfig"
export const apiGetCurrent=() => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-current'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}
)
export const apiUpdateUser = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: '/api/v1/user/update-user',
            data: data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})