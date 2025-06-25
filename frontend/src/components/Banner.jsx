import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className='relative'>
            <img
                src={assets.main_banner_bg}
                className='w-full hidden lg:block rounded-lg'
                alt="Fresh groceries and daily essentials"
            />
            <img
                src={assets.main_banner_bg_sm}
                className='w-full lg:hidden rounded-lg'
                alt="Fresh groceries and daily essentials"
            />

            <div className='absolute inset-0 flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:px-14 xl:px-24'>
                <div className='flex flex-col items-center lg:items-start w-full max-w-md lg:max-w-lg xl:max-w-xl lg:mr-0'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl mr-10 font-bold text-center lg:text-left leading-tight text-green-600 ml-10 mt-30 md:mt-12 mb-6 sm:mb-5 sm:pr-10'>
                        Your Reliable Source for Fresh, Daily Essentials.
                    </h1>

                    <div className='w-full flex justify-center lg:justify-start'>
                        <Link
                            to={'/products'}
                            className='group flex items-center justify-center sm:mt-0 mr-0 ml-0 mb-22 gap-2 px-7 sm:px-8 py-3 sm:ml-10 sm:mb-40
                            bg-green-500 hover:bg-green-600 transition-all duration-300 text-white rounded-lg text-sm sm:text-base'>
                            Shop Now
                            <img
                                className='lg:hidden transition-transform duration-300 group-hover:translate-x-1'
                                src={assets.white_arrow_icon}
                                alt="shop now"
                                width={16}
                                height={16}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner