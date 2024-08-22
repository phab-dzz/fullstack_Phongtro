import { where } from "sequelize";
import db from "../models";

export const getPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll(
            {
                raw: true,
                nest: true,// gộp lại thành object
                include: [
                    { model: db.Image, as: 'images', attributes: ['image'] },
                    { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                    { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description']
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


export const getPostLimitService = (offset, query) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAndCountAll(
            {
                where: query,
                raw: true,
                nest: true,// gộp lại thành object
                offset: offset * (+process.env.LIMIT),
                limit: +process.env.LIMIT,

                include: [
                    { model: db.Image, as: 'images', attributes: ['image'] },
                    { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                    { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description']
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