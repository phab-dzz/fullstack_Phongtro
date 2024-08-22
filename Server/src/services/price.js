import db from "../models";

export const getPriceService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Price.findAll(
            {
                raw: true,

                attributes: ['code', 'value']
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
