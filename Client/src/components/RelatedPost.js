import React, { useEffect } from 'react';
import {Sitem} from './index';
import {useSelector,useDispatch} from 'react-redux';
import * as actions from '../store/actions';
 const RelatedPost = () => {
    const {newPosts} = useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getNewPosts());
        }, []);
    return (
        <div className="w-full bg-white rounded-md shadow-md p-4">
            <h3 className='font-semibold text-lg'>Tin mới đăng</h3>
            <div className='w-full flex flex-col gap-2'>
                {newPosts?.map((item) => {
                    return (
                        <Sitem
                            key={item.id}
                            title={item.title}
                            price={item?.attributes?.price}
                            createdAt={item.createdAt}
                            image={JSON.parse(item.images.image)}
                        />
                    );
                })}

            </div>

           
        </div>
    );
};
export default RelatedPost;