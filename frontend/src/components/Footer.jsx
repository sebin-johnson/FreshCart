import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-scroll'


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-blue-50 via-white to-green-50 border-t border-gray-200 mt-16">
            <div className="container px-6 py-12 mx-auto">
                {/* Newsletter Section */}
                <section aria-labelledby="newsletter-heading">
                    <div className="md:flex md:items-center md:justify-between bg-white p-8 rounded-2xl mb-12 shadow-lg border border-green-100">
                        <div className="mb-6 md:mb-0 md:mr-8">
                            <h2 id="newsletter-heading" className="text-2xl font-bold text-gray-800 lg:text-3xl">
                                🌟 Stay Updated & Save Big!
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Get exclusive deals and insider tips
                            </p>
                        </div>

                        <div className="flex-1 max-w-xl">
                            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    aria-label="Email for newsletter subscription"
                                    className="w-full px-4 py-3 text-sm border border-green-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-300 focus:border-green-300"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-green-500 rounded-xl gap-x-2 hover:bg-green-600 transition-colors focus:ring-2 focus:ring-green-300 shadow-md"
                                >
                                    Subscribe
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Links Grid */}
                <nav aria-label="Footer navigation" className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-green-500">⚡</span>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="flex items-center text-gray-700 hover:text-green-600 transition-colors gap-2 cursor-pointer">
                                    <span className="text-green-400">→</span>
                                    Home
                                </a>
                            </li>
                            <li>
                                <Link to="category" smooth={true} duration={500} className="flex items-center text-gray-700 hover:text-green-600 transition-colors gap-2 cursor-pointer">
                                    <span className="text-green-400">→</span>
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="bestSeller" smooth={true} duration={500} className="flex items-center text-gray-700 hover:text-green-600 transition-colors gap-2 cursor-pointer">
                                    <span className="text-green-400">→</span>
                                    Best Seller
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-green-500">🛠️</span>
                            Services
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Delivery Information</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Track your Order</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Payment Methods</a></li>
                        </ul>
                    </div>

                    {/* Follow us */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-green-500">📱</span>
                            Follow us
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Instagram</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Twitter</a></li>
                            <li><a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Facebook</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <address>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-green-500">📬</span>
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="tel:+8807684734978" className="flex items-center text-gray-700 hover:text-green-600 transition-colors gap-2">
                                    <span className="text-green-400">📞</span>
                                    +91 9876 543 210
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@merakiui.com" className="flex items-center text-gray-700 hover:text-green-600 transition-colors gap-2">
                                    <span className="text-green-400">✉️</span>
                                    freshcart@gmail.com
                                </a>
                            </li>
                        </ul>
                    </address>
                </nav>

                {/* Copyright Section */}
                <div className="mt-12 pt-8 border-t border-green-100">
                    <div className="flex flex-col items-center justify-between sm:flex-row gap-4">
                        <div className="flex items-center gap-3">
                            <img
                                className="w-auto h-10"
                                src={assets.logo}
                                alt="Company Logo"
                            />
                        </div>

                        <p className="text-sm text-gray-600 text-center sm:text-left">
                            © {currentYear} FreshCart. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;