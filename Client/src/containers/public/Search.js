import React, { useCallback, useEffect, useState } from "react";
import { SearchItem, Modal } from "../../components";
import icons from "../../utils/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { path } from '../../utils/constant'

const { 
    GrNext, 
    HiOutlineLocationMarker, 
    TbReportMoney, 
    RiCrop2Line, 
    MdOutlineHouseSiding, 
    FiDelete, 
    FiSearch, 
    BsChevronRight,
    HiOutlineFilter 
} = icons;

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowMobileFilters, setIsShowMobileFilters] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState('');
    const { provinces, areas, prices, categories } = useSelector(state => state.app);

    const [queries, setQueries] = useState({})
    const [searchText, setSearchText] = useState('')

    const [arrMinMax, setArrMinMax] = useState({})
    const [defaultText, setDefaultText] = useState('')

    // Fallback icons
    const FilterIcon = HiOutlineFilter || (() => <span>⚙</span>)
    const SearchIcon = FiSearch || (() => <span>🔍</span>)

    useEffect(() => {
        if (!location?.pathname.includes(path.SEARCH)) {
            setArrMinMax({})
            setQueries({})
            setSearchText('')
        }
    }, [location])

    const handleShowModal = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setDefaultText(defaultText)
        setIsShowModal(true)
    }

    const handleSubmit = useCallback((e, query, arrMaxMin) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
    }, [isShowModal, queries])

    const handleSearch = () => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        let queryCodesObj = {}
        queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        let queryTextObj = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })

        // Thêm searchText vào queryCodesObj
        if (searchText) {
            queryCodesObj.search = searchText
        }

        let titleSearch = `${queryTextObj.category
            ? queryTextObj.category
            : 'Cho thuê tất cả'} ${queryTextObj.province
                ? `tỉnh ${queryTextObj.province}`
                : ''} ${searchText ? `"${searchText}"` : ''}`

        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString(),
        }, { state: { titleSearch } })
    }

    const toggleMobileFilters = () => {
        setIsShowMobileFilters(prev => !prev)
    }

    const closeMobileFilters = () => {
        setIsShowMobileFilters(false)
    }

    return (
        <>
            {/* Desktop Search */}
            <div className='hidden lg:flex p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row items-center justify-around gap-2'>
                <span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} className='cursor-pointer flex-1'>
                    <SearchItem 
                        IconBefore={MdOutlineHouseSiding && <MdOutlineHouseSiding />} 
                        fontWeight 
                        IconAfter={BsChevronRight && <BsChevronRight color='rgb(156, 163, 175)' />} 
                        text={queries.category} 
                        defaultText={'Tìm tất cả'} 
                    />
                </span>
                <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} className='cursor-pointer flex-1'>
                    <SearchItem 
                        IconBefore={HiOutlineLocationMarker && <HiOutlineLocationMarker />} 
                        IconAfter={BsChevronRight && <BsChevronRight color='rgb(156, 163, 175)' />} 
                        text={queries.province} 
                        defaultText={'Toàn quốc'} 
                    />
                </span>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 h-[36px]"
                />
                <button
                    type='button'
                    onClick={handleSearch}
                    className='outline-none py-2 px-4 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium h-[36px] rounded-md w-[120px] flex-shrink-0'
                >
                    <SearchIcon />
                    Tìm
                </button>
            </div>

         
            <div className='lg:hidden w-full max-w-4xl mx-auto px-4 my-3'>
                
                <div className='flex items-center gap-2 bg-[#febb02] p-3 rounded-lg'>
                    <button
                        type='button'
                        onClick={toggleMobileFilters}
                        className='p-2 bg-white rounded-md shadow-sm border border-gray-200 flex-shrink-0'
                        aria-label="Filters"
                    >
                        <FilterIcon size={20} />
                    </button>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Nhập từ khóa tìm kiếm..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 h-[36px]"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch()
                            }
                        }}
                    />
                    <button
                        type='button'
                        onClick={handleSearch}
                        className='outline-none py-2 px-4 bg-secondary1 text-sm flex items-center justify-center gap-2 text-white font-medium h-[36px] rounded-md flex-shrink-0'
                    >
                        <SearchIcon size={16} />
                        <span className='hidden sm:inline'>Tìm kiếm</span>
                    </button>
                </div>

          
                {(queries.category || queries.province) && (
                    <div className='mt-2 flex flex-wrap gap-2'>
                        {queries.category && (
                            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                                {queries.category}
                                <button
                                    onClick={() => setQueries(prev => ({ ...prev, category: null }))}
                                    className='ml-2 text-blue-600 hover:text-blue-800'
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {queries.province && (
                            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                {queries.province}
                                <button
                                    onClick={() => setQueries(prev => ({ ...prev, province: null }))}
                                    className='ml-2 text-green-600 hover:text-green-800'
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                )}

               
                {isShowMobileFilters && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={closeMobileFilters} />
                )}

                
                <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                    isShowMobileFilters ? 'translate-y-0' : 'translate-y-full'
                }`}>
                    <div className='p-4'>
                      
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-lg font-semibold text-gray-800'>Bộ lọc tìm kiếm</h3>
                            <button
                                onClick={closeMobileFilters}
                                className='p-2 text-gray-600 hover:text-gray-800'
                            >
                                ×
                            </button>
                        </div>

                       
                        <div className='space-y-3'>
                            <div 
                                onClick={() => {
                                    handleShowModal(categories, 'category', 'Tìm tất cả')
                                    closeMobileFilters()
                                }} 
                                className='cursor-pointer'
                            >
                                <SearchItem 
                                    IconBefore={MdOutlineHouseSiding && <MdOutlineHouseSiding />} 
                                    fontWeight 
                                    IconAfter={BsChevronRight && <BsChevronRight color='rgb(156, 163, 175)' />} 
                                    text={queries.category} 
                                    defaultText={'Tìm tất cả'} 
                                />
                            </div>
                            <div 
                                onClick={() => {
                                    handleShowModal(provinces, 'province', 'Toàn quốc')
                                    closeMobileFilters()
                                }} 
                                className='cursor-pointer'
                            >
                                <SearchItem 
                                    IconBefore={HiOutlineLocationMarker && <HiOutlineLocationMarker />} 
                                    IconAfter={BsChevronRight && <BsChevronRight color='rgb(156, 163, 175)' />} 
                                    text={queries.province} 
                                    defaultText={'Toàn quốc'} 
                                />
                            </div>
                        </div>

                      
                        <button
                            onClick={closeMobileFilters}
                            className='w-full mt-4 py-3 bg-[#febb02] text-white font-medium rounded-lg'
                        >
                            Áp dụng bộ lọc
                        </button>
                    </div>
                </div>
            </div>

            {isShowModal && <Modal
                handleSubmit={handleSubmit}
                queries={queries}
                arrMinMax={arrMinMax}
                content={content}
                name={name}
                setIsShowModal={setIsShowModal}
                defaultText={defaultText}
            />}
        </>
    )
}

export default Search;