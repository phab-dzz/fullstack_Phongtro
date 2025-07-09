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


export const getPostLimitService = (page, query,{priceNumber, areaNumber}) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
const queries = {...query}
 if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
        if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber }
        const response = await db.Post.findAndCountAll(
            {
                where: queries,
                raw: true,
                nest: true,// gộp lại thành object
                offset: offset * +process.env.LIMIT,
                limit: +process.env.LIMIT,

                include: [
                    { model: db.Image, as: 'images', attributes: ['image'] },
                    { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                    { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description',]
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
export const getNewPostsService = () => new Promise(async (resolve, reject) => {
    try{
        const response = await db.Post.findAll(
            {
                raw: true,
                nest: true,
                offset: 0,
                order: [['createdAt', 'DESC']],
                limit: +process.env.LIMIT,
                include: [
                    { model: db.Image, as: 'images', attributes: ['image'] },
                    { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                ],
                attributes: ['id', 'title', 'star', 'createdAt']
            })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : ' getting post in fail',
            response: response
        })
    }catch (error) {
        reject(error)
    }
}
)
export const getPostByIdService = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findOne(
            {
                where: { id: id },
                raw: true,
                nest: true,// gộp lại thành object
                include: [
                    { model: db.Image, as: 'images', attributes: ['image'] },
                    { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                    { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone','avatar','fbUrl'] },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description','createdAt', 'updatedAt']
            }
        )
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'get post by Id fail',
            response: response

        })
    } catch (error) {

        reject(error)
    }
}
)