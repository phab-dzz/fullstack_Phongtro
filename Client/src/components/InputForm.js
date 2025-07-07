import React, { memo } from 'react'
const InputForm = ({ label, value, setvalue, keyPayLoad, invalidFields, setInvalidFields, type }) => {
    return (
        <div>
            <label htmlFor='phone' className='text-xs'>{label}</label>
            <input type={type || 'text'} id='phone'
                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full '
                value={value}
                //resset errror

                onFocus={() => setInvalidFields([])}
                onChange={(e) => setvalue(prev => ({ ...prev, [keyPayLoad]: e.target.value }))}
            />
            {invalidFields.length > 0 && invalidFields.some(i => i.name === keyPayLoad) &&
                <small className='text-red-500 italic'>
                    {invalidFields.find(i => i.name === keyPayLoad)?.message}   </small>}




        </div>
    )
}
export default memo(InputForm);