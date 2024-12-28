import React from 'react'

const footer = () => {
    return (
        <article className='border-t-2 border-black'>
            <div className='py-6 px-10'>
                <p className='text-[12px] text-center'>
                    IMPORTANT NOTE : This tech pack is confidential and is the sole property of BARISCEANO, to be utilised only for the purpose which it has been sent and intended only for the information of the individual/entity to whom it is addressed. All artwork appearing in this bundle are trademark, owned by BARISCEANO and cannot be used, distributed or copied.
                </p>
                <div className='mt-10 w-full flex justify-between'>
                    <button className='border border-black px-4 py-2 rounded-xl'>Pervious</button>
                    <button className='border border-black px-4 py-2 rounded-xl'>Next</button>
                </div>
            </div>
        </article>

    )
}

export default footer