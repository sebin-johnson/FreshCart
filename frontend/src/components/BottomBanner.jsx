import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
    return (
        <div className='relative mt-24'>
            <img src={assets.bottom_banner_image} alt="bottomBanner" className='w-full hidden md:block rounded-lg' />
            <img src={assets.bottom_banner_image_sm} alt="bottomBanner" className='w-full md:hidden rounded-lg' />

            <div className='absolute inset-0 flex flex-col items-center md:items-start md:justify-center pt-16 md:pt-0 md:pr-24 sm:ml-12'>
                <div className='p-6 rounded-lg'>
                    <h1 className='text-2xl md:text-3xl font-semibold mb-6 text-white'>Why We Are Best?</h1>
                    {
                        features.map((feature, index) => (
                            <div key={index} className='flex items-start gap-2 mt-4'>
                                <img src={feature.icon} alt={feature.title} className='md:w-11 w-9' />
                                <div>
                                    <h3 className='text-lg md:text-xl font-semibold text-white'>{feature.title}</h3>
                                    <p className='text-gray-300 text-xs md:text-sm'>{feature.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BottomBanner
