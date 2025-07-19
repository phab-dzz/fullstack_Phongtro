import db from "../models/index.js";

export const getAreaService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Area.findAll(
            {
                raw: true,

                attributes: ['code', 'value', 'order']
            }
            //     attributes: ['id', 'title','star', 'content', 'createdAt', 'updatedAt'],
            // }
        )
        // console.log(response)
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'fail',
            response: response

        })
    } catch (error) {

        reject(error)
    }
}
)
