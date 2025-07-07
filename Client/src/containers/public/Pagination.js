import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { PageNumber } from '../../components';
import { useSearchParams } from 'react-router-dom';
import icons from '../../utils/icons'
const arrNumber = [1, 2, 3,]
const { GrLinkNext, GrLinkPrevious } = icons
const Pagination = ({ Number }) => {
    const { count, posts } = useSelector(state => state.post)
    const [arrPage, setArrPage] = useState([])
    const [currentPage, setCurrentPage] = useState(+Number || 1)
    const [isHide, setIsHide] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)
    const [searchParams]=useSearchParams();
    // const hanldePageNumber = () => {
    //     let max = Math.floor(count / length)
    //     let arrNumber = []
    //     for (let i = 1; i <= max; i++)
    //         arrNumber.push(i)
    //     return arrNumber.length > 4 ? arrNumber.filter(i => i < 5) : arrNumber;

    // }

    useEffect(() => {
        let page = searchParams.get('page')
        page&& +page !== currentPage && setCurrentPage(+page)
        !page && setCurrentPage(1)
    }
        , [searchParams])
    useEffect(() => {
        let max = Math.floor(count / process.env.REACT_APP_LIMIT_POSTS)
        let end = (currentPage + 1) > max ? max : currentPage + 1
        let start = currentPage - 1 <= 0 ? 1 : (currentPage - 1)
        let temp = []
        for (let i = start; i <= end; i++) {
            temp.push(i)

        } setArrPage(temp)
        currentPage >= (max - 1) ? setIsHide(true) : setIsHide(false)
        currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)

    }, [count, posts, currentPage])

    return (
        <div className=' flex items-center justify-center gap-2 object-cover overflow-hidden text-black py-5'>
            {!isHideStart && <PageNumber icon={<GrLinkPrevious size={23} />} type='end' setCurrentPage={setCurrentPage} text={1} />}
            {!isHideStart && <PageNumber text={'...'} />}


            {arrPage.length > 0 && arrPage.map(item => {
                return (
                    <PageNumber
                        key={item} text={item}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}

                    />
                )
            })}
            {!isHide && <PageNumber text={'...'}
            />}
            {!isHide && <PageNumber icon={<GrLinkNext size={23} />} setCurrentPage={setCurrentPage} text={Math.floor(count / posts.length)} type='end' />}
        </div>

    );
};

export default Pagination;