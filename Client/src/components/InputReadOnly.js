import React from "react";

const InputReadOnly = ({ label, value }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor="exactly-address">{label}</label>
            <input
                type="text"
                id='exactly-address'
                value={value||''}
                readOnly
                className='outline-none border border-gray-300 p-2 rounded-md w-full bg-gray-100 cursor-not-allowed'
            />
        </div>
    )
}
export default InputReadOnly;