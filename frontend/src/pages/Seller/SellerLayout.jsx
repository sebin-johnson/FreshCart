import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SellerLayout = () => {
    const { setIsSeller, axios, navigate } = useAppContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const navigate = useNavigate();

    const sidebarLinks = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/seller/logout')
            if (data) {
                toast.success("Logout successfull")
                navigate('/')
            } else {
                toast.error("Logout failed!")
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="flex h-screen">
            {/* Mobile Menu Button - Top Right */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside className={`fixed md:relative z-40 md:z-auto w-64 h-screen transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                bg-white border-r border-gray-300 flex flex-col`}
            >
                <div className="flex-1 flex flex-col px-4 py-8 overflow-y-auto">
                    {/* Close Button for Mobile */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <Link to="/" className="mx-auto mb-6" onClick={() => setIsSidebarOpen(false)}>
                        <img className="h-10" src={assets.logo} alt="logo" />
                    </Link>

                    <div className="flex flex-col items-center mb-8">
                        <img
                            className="w-24 h-24 rounded-full"
                            src={assets.profile_icon}
                            alt="avatar"
                        />
                        <h4 className="mt-2 font-medium text-gray-800">Admin</h4>
                    </div>

                    {/* Nav links */}
                    <nav className="space-y-2 flex-1">
                        {sidebarLinks.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                end={link.path === '/seller'}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-green-500/10 border-r-4 md:border-r-6 border-green-500 text-gray-500'
                                        : 'text-gray-700 hover:bg-gray-100/90'
                                    }`
                                }
                            >
                                <img src={link.icon} className="w-7 h-7" alt="" />
                                <span className="ml-4 font-medium">{link.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="mt-auto flex justify-center">
                        <button
                            onClick={logout}
                            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content area with top padding for mobile header */}
            <main className="flex-1 overflow-auto pt-16 md:pt-6 p-4 md:p-6 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};

export default SellerLayout;