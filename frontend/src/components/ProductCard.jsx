import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { addToCart, removeFromCart, cartItems, navigate } = useAppContext()

    return product && (
        <>
            <div className="max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-transform transform hover:scale-103 hover:shadow-xl"
                onClick={(e) => {
                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                    scrollTo(0, 0)
                }}>
                <div className="flex">
                    <div className="w-44 h-48 bg-green-100 flex items-center justify-center">
                        <img src={product.image[0]} alt="Product" className=" w-full h-auto rounded-md" />
                    </div>

                    <div className="w-2/3 p-4">
                        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

                        <div className="flex items-center mt-2 space-x-1">
                            {Array(5).fill('').map((_, i) => (
                                <img key={i} className='md:w-3.5 w-3' src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="Star" />
                            ))}
                            <p>(4)</p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold text-green-600">₹{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">₹{product.price}</span></span>
                            <div className="text-green-500" onClick={(e) => { e.stopPropagation() }}>
                                {!cartItems[product._id] ? (
                                    <button className="flex items-center justify-center gap-1 bg-green-100/10 border border-green-300/40 md:w-[80px] w-[64px] h-[34px] rounded text-green-600 font-medium cursor-pointer"
                                        onClick={() => addToCart(product._id)}>
                                        <img src={assets.cart_icon} alt="cartIcon" />
                                        Add
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-green-500/25 rounded select-none">
                                        <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full">
                                            -
                                        </button>
                                        <span className="w-5 text-center">{cartItems[product._id]}</span>
                                        <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full">
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard
