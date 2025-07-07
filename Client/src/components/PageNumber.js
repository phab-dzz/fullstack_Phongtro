import React, { memo } from 'react';
import { createSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md'
const active = 'w-[46px] h-[48px] flex justify-center items-center bg-[#E13427] text-white hover:opacity-90 rounded-md'
const PageNumber = ({ text, currentPage, icon, setCurrentPage, type }) => {
    const [searchParams] = useSearchParams()
    let entries = searchParams.entries()
    const navigate = useNavigate()
    const append = (entries) => {
        let params = []
        searchParams.append('page', +text)
        for (let entry of entries) {
            params.push(entry);
        }
        let a = {}
        params?.map(i => {
            a = { ...a, [i[0]]: i[1] }
        })
        return a
    }
    const handleChangPage = () => {
        setCurrentPage(+text)
        if (!(text === '...')) {

            setCurrentPage(+text)

            navigate({
                pathname: '/',
                search: createSearchParams(
                    append(entries)

                ).toString()
            })
        }
    }
    return (
        <div


            className={+text === +currentPage ? active : `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`}
            onClick={text === '...' ? null : handleChangPage}
        >
            {icon || text}
        </div>
    );
};

export default memo(PageNumber);