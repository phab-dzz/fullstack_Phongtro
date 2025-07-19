import React, { useState } from 'react'
import { Overview, Address, Loading, Button,MapWithSearch } from '../../components'
import { apiUploadImages } from '../../services'
import icons from '../../utils/icons'
import { getCodes, getCodesArea } from '../../utils/common/getCodes'
import { useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { apiCreatePost } from '../../services'
import { toast } from 'react-toastify'

const { BsCameraFill, ImBin } = icons

const CreatePost = () => {
     const [imagesPreview, setImagesPreview] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const { prices, areas,categories } = useSelector(state => state.app)
     const [payload, setPayload] = useState({
        categoryCode: '',
        title: '',
        priceNumber: '1',
        areaNumber: '100',
        images: '',
        address: '',
        priceCode: getCodes([1000, 100000], prices)||'NH5N',
        areaCode: getCodesArea([100, 1000], areas)||'NHA6',
        label: '',
        description: '',
        target: '',
        province: '',
      

    })
   
const handleFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        let images = []
        let files = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            let response = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data?.secure_url]
        }
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
    }
    const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }
    
    const validatePayload = () => {
        const requiredFields = ['categoryCode', 'title', 'priceNumber', 'areaNumber', 'images', 'address', 'description', 'target', 'province']
        for (let field of requiredFields) {
            if (!payload[field]) {
                toast.error(`Vui lòng nhập ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
                return false
            }
        }
        if (payload.images.length === 0) {
            toast.error('Vui lòng thêm ít nhất một hình ảnh')
            return false
        }
        if (payload.priceNumber <= 0|| isNaN(payload.priceNumber)) {
            toast.error('Vui lòng nhập giá hợp lệ')
            return false
        }
        if (payload.areaNumber <= 0) {
            toast.error('Vui lòng nhập diện tích hợp lệ')
            return false
        }
        return true
    }
    const hadlecreated = async() => {
        console.log("Payload created", payload)
         const response = await apiCreatePost(payload)
        console.log("Response from create post", response)
        if (response?.status === 200) {
            toast.success('Tạo tin thành công')
            setPayload({
                categoryCode: '',
                title: '',
                priceNumber: 0,
                areaNumber: 0,
                images: [],
                address: '',
                priceCode: '',
                areaCode: '',
                description: '',
                target: '',
                province: '',
                label: '',
            })
            setImagesPreview([])
           
        } else {
            toast.error('Tạo tin thất bại')
        }
    }
 const   handleSubmit =  () => {
        if (!validatePayload()) return
//         let priceCode = getCodes([1000, 100000], prices)
// let areaCode = getCodesArea([100, 1000], areas)
//         console.log("Price code", priceCode, "Area code", areaCode)
       

    let cate=categories?.find(item => item.code === payload.categoryCode? item.value : '');


let prive = payload.address.split(',')[0]?.trim() || '';
let cateValue = cate?.value?.trim() || '';

        setPayload(prev => ({
    ...prev,
    label: `${cateValue} ${prive}`.trim(),
}))

         setTimeout(() => {
            hadlecreated()
        }, 2000)


       
       }
    return (
        <div className='px-6'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Đăng tin mới</h1>
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    <Address payload={payload} setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
                    <div className='w-full mb-6'>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                        <div className='w-full'>
                            <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor="file">
                                {isLoading
                                    ? <Loading />
                                    : <div className='flex flex-col items-center justify-center'>
                                        <BsCameraFill color='blue' size={50} />
                                        Thêm ảnh
                                    </div>}
                            </label>
                            <input onChange={handleFiles} hidden type="file" id='file' multiple />
                            <div className='w-full'>
                                <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview?.map(item => {
                                        return (
                                            <div key={item} className='relative w-1/3 h-1/3 '>
                                                <img src={item} alt="preview" className='w-full h-full object-cover rounded-md' />
                                                <span
                                                    title='Xóa'
                                                    onClick={() => handleDeleteImage(item)}
                                                    className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'
                                                >
                                                    <ImBin />
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleSubmit} text='Tạo mới' bgColor='bg-green-600' textColor='text-white' />
                    {/* <div className='h-[500px]'>

                    </div> */}
                </div>
                <div className='w-[30%] '>
                    <MapWithSearch address={payload.address} />
                   
                </div>
            </div>
            <div className="h-[50px]"></div>
        </div>
    )
}
export default CreatePost;