import { raw } from 'body-parser';
import db from '../models';
// get all categories
export const getCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw: true
           
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'success' : 'error',
            data: response
        });
    } catch (error) {
        reject(error)
    }
});
