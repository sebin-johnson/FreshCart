import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Loading = () => {
    const { navigate } = useAppContext()
    let { search } = useLocation()
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next')
    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate('/my-orders')
            }, 3000);
        }
    }, [nextUrl])
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-green-500 mb-4"></div>
            {/* <p className="text-gray-600 font-semibold text-lg">Loading...</p> */}
        </div>
    );
};

export default Loading;
