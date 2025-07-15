// import React, { memo, useEffect, useState } from 'react'
// import { Select, InputReadOnly } from '../components'
// import { apiGetPublicProvinces, apiGetPublicDistrict,apiGetPublicWard } from '../services'

// const Address = ({ setPayload }) => {

//     const [provinces, setProvinces] = useState([])
//     const [districts, setDistricts] = useState([])
//     const [ward, setWard] = useState('')
//     const [resetWard, setResetWard] = useState(false)
//     const [province, setProvince] = useState('')
//     const [district, setDistrict] = useState('')
//     const [reset, setReset] = useState(false)

//     useEffect(() => {
//         const fetchPublicProvince = async () => {
//             const response = await apiGetPublicProvinces()
//             if (response.status === 200) {
//                 setProvinces(response?.data.results)
//             }
//         }
//         fetchPublicProvince()
//     }, [])
//     useEffect(() => {
//         setDistrict(null)
//         const fetchPublicDistrict = async () => {
//             const response = await apiGetPublicDistrict(province)
//             if (response.status === 200) {
//                 setDistricts(response.data?.results)
//             }
//         }
//         province && fetchPublicDistrict()
//         !province ? setReset(true) : setReset(false)
//         !province && setDistricts([])
//     }, [province])
//     useEffect(() => {
//         setPayload(prev => ({
//             ...prev,
//             address: `${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
//             province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
//         }))

//     }, [province, district])
//     return (
//         <div>
//             <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
//             <div className='flex flex-col gap-4'>
//                 <div className='flex items-center gap-4'>
//                     <Select type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố' />
//                     <Select reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện' />
//                 </div>
//                 <InputReadOnly
//                     label='Địa chỉ chính xác'
//                     value={`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}
//                 />

//             </div>
//         </div>
//     )
// }

// export default memo(Address)
import React, { memo, useEffect, useState } from 'react'
import { Select, InputReadOnly } from '../components'
import { apiGetPublicProvinces, apiGetPublicDistrict, apiGetPublicWard } from '../services'

const Address = ({ setPayload }) => {
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')

    const [resetDistrict, setResetDistrict] = useState(false)
    const [resetWard, setResetWard] = useState(false)

    // Get Provinces
    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await apiGetPublicProvinces()
            if (res.status === 200) setProvinces(res?.data.results)
        }
        fetchProvinces()
    }, [])

    // Get Districts when province changes
    useEffect(() => {
        setDistrict('')
        setWards([])
        setWard('')
        const fetchDistricts = async () => {
            const res = await apiGetPublicDistrict(province)
            if (res.status === 200) setDistricts(res.data?.results)
        }
        province ? fetchDistricts() : setDistricts([])
        setResetDistrict(!province)
    }, [province])

    // Get Wards when district changes
    useEffect(() => {
        setWard('')
        const fetchWards = async () => {
            const res = await apiGetPublicWard(district)
            if (res.status === 200) setWards(res.data?.results)
        }
        district ? fetchWards() : setWards([])
        setResetWard(!district)
    }, [district])

    // Update payload
    useEffect(() => {
        const provinceName = provinces.find(item => item.province_id === province)?.province_name || ''
        const districtName = districts.find(item => item.district_id === district)?.district_name || ''
        const wardName = wards.find(item => item.ward_id === ward)?.ward_name || ''

        setPayload(prev => ({
            ...prev,
            address: `${wardName ? wardName + ', ' : ''}${districtName ? districtName + ', ' : ''}${provinceName}`,
            province: provinceName,
            district: districtName,
            ward: wardName
        }))
    }, [province, district, ward])

    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select
                        type='province'
                        value={province}
                        setValue={setProvince}
                        options={provinces}
                        label='Tỉnh/Thành phố'
                    />
                    <Select
                        reset={resetDistrict}
                        type='district'
                        value={district}
                        setValue={setDistrict}
                        options={districts}
                        label='Quận/Huyện'
                    />
                    <Select
                        reset={resetWard}
                        type='ward'
                        value={ward}
                        setValue={setWard}
                        options={wards}
                        label='Phường/Xã'
                    />
                </div>
                <InputReadOnly
                    label='Địa chỉ chính xác'
                    value={`${wards.find(w => w.ward_id === ward)?.ward_name || ''}${ward ? ', ' : ''}${districts.find(d => d.district_id === district)?.district_name || ''}${district ? ', ' : ''}${provinces.find(p => p.province_id === province)?.province_name || ''}`}
                />
            </div>
        </div>
    )
}

export default memo(Address)
