import React, { memo } from 'react'
import icons from "../utils/icons";
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString';
import { createSearchParams, Link } from 'react-router-dom'
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux'
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
const { GrNext } = icons
const ItemSidebar = ({ title, content, isDouble, type }) => {
    const dispatch = useDispatch()
    const [params] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    const formatConten = () => {

        const oddEl = content?.filter((item, index) => index % 2 === 0)
        const evenEl = content?.filter((item, index) => index % 2 !== 0)
        const formatContent = oddEl?.map((item, index) => {
            return {
                left: item,
                right: evenEl?.find((item2, index2) => index2 === index)
            }
        })
        return formatContent
    }
    const handfilterPosts = (code) => {
        // dispatch(actions.getPostsLimit({ offset: 1, [type]: code }))
        console.log("location", location.pathname  );
        
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({

                'priceCode': code,

            }).toString()
        });
    }

    return (
        <div className='p-4 rounded-md bg-white w-full'>
            <h3 className='text-lg  font-semibold'> {title}</h3>
            {!isDouble && <div className='flex flex-col gap-2'>
                {content?.length > 0 && content.map(item => {
                    return (
                        <Link
                            to={`${formatVietnameseToString(item.value)}`}
                            key={item.code} className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pd-1 border-dashed'>
                            <GrNext size={10} />
                            <p>{item.value}</p>
                        </Link>
                    )
                })}
            </div>}
            {isDouble && <div className='flex flex-col gap-2'>
                {content?.length > 0 && formatConten(content).map((item, index) => {
                    return (
                        <div key={item.code} className=''>
                            <div className='flex items-center justify-around '>
                                <div
                                    onClick={() => handfilterPosts(item.left.code)}
                                    className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pd-1 border-dashed'>
                                    <GrNext size={10} color='#ccc' />
                                    <p>{item.left.value}</p>

                                </div>
                                <div

                                    onClick={() => handfilterPosts(item.right.code)} className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pd-1 border-dashed'>
                                    <GrNext size={10} color='#ccc' />
                                    <p>{item.right.value}</p>
                                </div>
                            </div>



                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default memo(ItemSidebar)