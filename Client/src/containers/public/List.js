import { useEffect, useRef } from "react";
import React from "react";
import { Button, Item } from "../../components";
import { getPosts, getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";
const List = ({categoryCode}) => {
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    const ListRef = useRef()
    const [searchParams] = useSearchParams()

    // useEffect(() => {
    //     // let params = []
    //     // for (let entry of searchParams.entries()) {
    //     //     params.push(entry);
    //     // }
    //     let page1 = searchParams.get('page')
    //     let page = page1 ? +page1 - 1 : 0
    //     console.log("page" + page)
    //     dispatch(getPostsLimit({ page }))

    // }, [searchParams])
    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if(categoryCode) searchParamsObject.categoryCode = categoryCode
        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams])

    // if (!posts.posts) {
    //     return <div>Loading...</div>;
    // }
    // useEffect(() => {
    //     let params = []
    //     for (let entry of searchParams.entries()) {
    //         params.push(entry);
    //     }
    //     let searchParamsObject = {}
    //     params?.forEach(i => {
    //         if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
    //             searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
    //         } else {
    //             searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
    //         }
    //     })
    //     if (categoryCode) searchParamsObject.categoryCode = categoryCode
    //     dispatch(getPostsLimit(searchParamsObject))
    // }, [searchParams, categoryCode])
    return (
        <div className="w-full border-red-400 border p-2 bg-white rounded-md">
            <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold ">
                    Danh sach dang tin
                </h4>
                <span>
                    cap nhat ngay
                </span>
            </div>
            <div className=" flex items-center gap-2 my-2">
                <span>
                    Sắp xếp
                </span>
                <Button bgColor={'bg-gray-200'} text={'Mặc định'} />
                <Button bgColor={'bg-gray-200'} text={'Mới nhất'} />

            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    {/* {posts?.slice(0, 9).map(item => { */ }
                    return (
                        <Item
                            key={item?.id}
                            address={item?.address}
                            attributes={item?.attributes}
                            description={JSON.parse(item?.description)}
                            images={JSON.parse(item?.images?.image)}
                            star={+item?.star}
                            title={item?.title}
                            user={item?.user}
                            id={item?.id}
                        />
                    )
                })}
            </div>

        </div>

    )
}
export default List;