import { where } from "sequelize";
import db from "../models";
import { v4 } from 'uuid'
import generateCode from "../utils/generateCode";
import generateDate from "../utils/generateDate";

export const getPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll(
            {
                raw: true,
                nest: true,// gộp lại thành object
                include: [
                    { model: db.Image, as: 'images', attributes: ['image'] },
                    { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                    { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone','avatar'] },
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
                    { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone','avatar'] },
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
export const createNewPostService = (body,userId)=> new Promise(async (resolve, reject) => {
    try {
        const attributesId= v4()
        const imagesId = v4()
        const overviewId = v4()
        const labelCode = generateCode(body.label)
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`
        const currentDate = generateDate();
        
        await db.Post.create({
            id: v4(),
            title: body.title,
            labelCode,
            address: body.address||null,
            attributesId,
            categoryCode: body.categoryCode,
            description:JSON.stringify(body.description)||null,
            userId,
            overviewId,
            imagesId,
            areaCode: body.areaCode||null,
            priceCode: body.priceCode||null,
            provinceCode: body.provinceCode?.includes('Thành phố') ? generateCode(body.province?.replace('Thành phố', '').trim()) : generateCode(body.province?.replace('Tỉnh', '').trim()),
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber
        })
        await db.Attribute.create({
            id: attributesId,
            price: +body.priceNumber<1?`${body.priceNumber *1000000}đồng/tháng`:`${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2`,
            published: body.published,
            hashtag: hashtag,
        })
        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body.images)
        })
        await db.Label.findOrCreate({
            where: {
                code: labelCode,
            },
            defaults: {
               code: labelCode,
                value: body.label,
            }
        })
        await db.Overview.create({
            id: overviewId,
            code:hashtag,
            area: body.label,
            type: body?.category,
            target: body?.target,
            bonus:'Tin thường',
            created: currentDate.today,
            expired: currentDate.dateExpire,
        })
        resolve({
            err: 0,
            msg: 'Create new post successfully'+ currentDate.today,
        })
    } catch (error) {
        reject(error)
    }
})
export const getPostLimitAdminService = (id) => new Promise(async (resolve, reject) => {
    try {
       
        // console.log("Id from get post limit admin", id)

        const response = await db.Post.findAndCountAll(
            {
                where: { userId: id },
                raw: true,
                nest: true,// gộp lại thành object
                // offset: 1 * +process.env.LIMIT,
                // limit: +process.env.LIMIT,

                include: [
                    { model: db.Image, as: 'images', attributes: ['image'] },
                    { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                    { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                    { model: db.Overview, as: 'overviews', attributes: ['code', 'area', 'type', 'target', 'bonus', 'created', 'expired'] }
                ],
                attributes: ['id', 'title', 'address', 'description']
            }
        )
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
export const deletePostService = (postId,id) => new Promise(async (resolve, reject) => {
    try {
        const post = await db.Post.findOne({
            where: { id: postId, userId: id }
        })
        if (!post) {
            return resolve({
                err: 1,
                msg: 'Post not found or you do not have permission to delete this post'
            })
        }
        await db.Post.destroy({
            where: { id: postId, userId: id }
        })
        resolve({
            err: 0,
            msg: 'Delete post successfully'
        })
    } catch (error) {
        reject(error)
    }
})