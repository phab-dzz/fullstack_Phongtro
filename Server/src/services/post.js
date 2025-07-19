import { where } from "sequelize";
import db from "../models/index.js";
import { v4 } from 'uuid'
import generateCode from "../utils/generateCode.js";
import generateDate from "../utils/generateDate.js";
import { Op } from "sequelize";

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


// export const getPostLimitService = (page, query,{priceNumber, areaNumber}) => new Promise(async (resolve, reject) => {
//     try {
//         let offset = (!page || +page <= 1) ? 0 : (+page - 1)
// const queries = {...query}
//  if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
//         if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber }
        
//         const response = await db.Post.findAndCountAll(
//             {
//                 where: queries,
//                 raw: true,
//                 nest: true,// gộp lại thành object
//                 offset: offset * +process.env.LIMIT,
//                 limit: +process.env.LIMIT,

//                 include: [
//                     { model: db.Image, as: 'images', attributes: ['image'] },
//                     { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
//                     { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone','avatar'] },
//                 ],
//                 attributes: ['id', 'title', 'star', 'address', 'description',]
//             }
//             //     attributes: ['id', 'title','star', 'content', 'createdAt', 'updatedAt'],
//             // }
//         )
//         // console.log(response)
//         resolve({
//             err: response ? 0 : 1,
//             msg: response ? 'OK' : 'fail',
//             response: response

//         })
//     } catch (error) {

//         reject(error)
//     }
// }
// )
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
                // raw: true,
                // nest: true,// gộp lại thành object
                // offset: 1 * +process.env.LIMIT,
                // limit: +process.env.LIMIT,

                include: [
                    { model: db.Image, as: 'images', attributes: ['image', 'id'] },
                    { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag','id'] },
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
export const updatePostServicebyadmin = (data, id) => new Promise(async (resolve, reject) => {
  try {
    if (!data || !id) {
      return resolve({ err: 1, msg: 'Missing input data' });
    }

  
    const post = await db.Post.findOne({ where: { id }, raw: true });
    if (!post) return resolve({ err: 1, msg: 'Post not found' });

   
    let updated = {
      post: false,
      image: false,
      attribute: false
    };

   
    if (data.images?.image && Array.isArray(data.images.image)) {
  const oldImages = await db.Image.findOne({ where: { id: post.imagesId }, raw: true });

  const oldImageArray = typeof oldImages.image === 'string' ? JSON.parse(oldImages.image) : oldImages.image;

  if (JSON.stringify(oldImageArray) !== JSON.stringify(data.images.image)) {
    await db.Image.update(
      { image: JSON.stringify(data.images.image) }, // convert mảng → chuỗi JSON
      { where: { id: post.imagesId } }
    );
    updated.image = true;
  }
}


    
    if (data.attributes) {
      const oldAttr = await db.Attribute.findOne({ where: { id: post.attributesId }, raw: true });

      const attrToUpdate = {
        price: data.attributes.price,
        acreage: data.attributes.acreage
      };

      if (
        attrToUpdate.price !== oldAttr.price ||
        attrToUpdate.acreage !== oldAttr.acreage
      ) {
        await db.Attribute.update(attrToUpdate, { where: { id: post.attributesId } });
        updated.attribute = true;
      }
    }

   
    const postToUpdate = {
      title: data.title,
      address: data.address,
      description: data.description
    };

    const hasPostChanged = Object.entries(postToUpdate).some(([key, val]) => post[key] !== val);

    if (hasPostChanged) {
      await db.Post.update(postToUpdate, { where: { id } });
      updated.post = true;
    }

   
    const isAnyUpdate = Object.values(updated).some(val => val);

    resolve({
      err: isAnyUpdate ? 0 : 1,
      msg: isAnyUpdate ? 'Cập nhật thành công' : 'Không có thay đổi để cập nhật',
      updated
    });

  } catch (error) {
    console.log('Error in updatePostServicebyadmin:', error);

   
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return resolve({ err: -1, msg: `Lỗi dữ liệu JSON: ${error.message}` });
    }

    reject(error);
  }
});


export const searchPostService = (query) => new Promise(async (resolve, reject) => {
    try {
        const { find, provinceCode } = query;

        
        let wherePost = {};
        if (find) {
            wherePost[Op.or] = [
                { title: { [Op.like]: `%${find}%` } },
                { address: { [Op.like]: `%${find}%` } },
            ];
        }
        if (provinceCode) {
            wherePost.provinceCode = provinceCode;
        }

        const response = await db.Post.findAll({
            where: Object.keys(wherePost).length > 0 ? wherePost : undefined,
            raw: true,
            nest: true,
            include: [
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['image'],
                },
                {
                    model: db.Attribute,
                    as: 'attributes',
                    attributes: ['price', 'acreage', 'published', 'hashtag'],
                    
                },
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'zalo', 'phone', 'avatar'],
                },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description', 'provinceCode'],
        });

        resolve({
            err: 0,
            msg: 'OK',
            count: response.length,
            response: response,
            
        });

    } catch (error) {
        console.log(error);
        reject(error);
    }
});
export const getPostLimitService = (page, query, { priceNumber, areaNumber, isNewest }) => new Promise(async (resolve, reject) => {
    try {
        const limit = +process.env.LIMIT || 10;
        const offset = (!page || +page <= 1) ? 0 : (+page - 1) * limit;

        const { search, ...restQuery } = query;
        const queries = { ...restQuery };

        if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber };
        if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };

        if (search) {
            queries[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { address: { [Op.like]: `%${search}%` } },
            ];
        }

        // 👉 Tạo object cấu hình query
        const options = {
            where: queries,
            raw: true,
            nest: true,
            offset,
            limit,
            include: [
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['image'],
                },
                {
                    model: db.Attribute,
                    as: 'attributes',
                    attributes: ['price', 'acreage', 'published', 'hashtag'],
                },
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['name', 'zalo', 'phone', 'avatar'],
                },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description','createdAt'],
        };

        if (isNewest) {
            options.order = [['createdAt', 'DESC']];
        }

        const response = await db.Post.findAndCountAll(options);

        resolve({
            err: 0,
            msg: 'OK',
            response
        });

    } catch (error) {
        console.log(error);
        reject(error);
    }
});
