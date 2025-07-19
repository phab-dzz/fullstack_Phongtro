import db from '../models/index.js';

export const getOne =(id)=> new Promise(async (resolve, reject) => {
       try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get provinces.',
            response
        })
    } catch (error) {
        reject(error)
    }
})
export const updateUser = (data,id) => new Promise(async (resolve, reject) => {
    try{
        const response = await db.User.update(data, {
            where: {  id }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Update user successfully' : 'Failed to update user',
            response
        })

    } catch (error) {
        reject(error)
    }
})