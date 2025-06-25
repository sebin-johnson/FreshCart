import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Link, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductDetails = () => {
    const { products, addToCart, navigate } = useAppContext()
    const { id } = useParams()
    const [relatedProducts, setRelatedProducts] = useState([])
    const [thumbnail, setThumbnail] = useState(null)
    const product = products.find((item => item._id === id))
    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice()
            productCopy = productCopy.filter((item) => product.category === item.category)
            setRelatedProducts(productCopy.slice(0, 5))
        }
    }, [products])
    useEffect(() => {
        setThumbnail(product?.image[0] ? product.image[0] : null)
    }, [product])
    return product && (
        <>
            <div className="mt-16">
                <div className="mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-500 mb-4">
                        <Link to={'/'} className="hover:text-green-600">Home</Link> /
                        <Link to={'/products'} className="hover:text-green-600"> Products</Link> /
                        <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-green-600"> {product.category}</Link> /
                        <span className="text-gray-700">{product.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Main Image Only */}
                        <div className="w-full md:w-1/2">
                            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center w-full">
                                <img
                                    src={thumbnail}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain p-4"
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="w-full md:w-1/2">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <div className="flex">
                                    {Array(5).fill('').map((_, i) => (
                                        <img
                                            key={i}
                                            src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                                            alt="Star"
                                            className="w-5 h-5"
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-500 ml-2">(4 reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <p className="text-gray-500 line-through">MRP: ${product.price}</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ${product.offerPrice} <span className="text-sm text-gray-500">(Inclusive of all taxes)</span>
                                </p>
                            </div>

                            {/* About Product */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 mb-2">About Product</h3>
                                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                    {product.description.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="px-6 py-2 w-70 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => {
                                        addToCart(product._id);
                                        navigate('/cart');
                                    }}
                                    className="px-6 py-2 w-70 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Related Products */}
                <div className="flex flex-col items-center mt-16 px-4 sm:px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 relative inline-block">
                            Related Products
                        </h2>
                    </div>

                    <div className="w-full flex justify-center mt-10 mb-10">
                        <div className="grid justify-items-center justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 sm:gap-5 md:gap-6 max-w-[1320px] mx-auto px-4 w-full">
                            {relatedProducts
                                .filter(product => product.inStock).slice(0, 3)
                                .map((product, index) => (
                                    <div key={index} className="flex justify-center">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                        </div>
                    </div>

                    <button className="mt-12 px-8 sm:px-12 py-2.5 text-sm sm:text-base border rounded text-green-500 hover:bg-green-500/10 transition"
                        onClick={() => {
                            navigate('/products')
                            scrollTo(0, 0)
                        }}>
                        See More
                    </button>
                </div>

            </div>
        </>
    )
}

export default ProductDetails
