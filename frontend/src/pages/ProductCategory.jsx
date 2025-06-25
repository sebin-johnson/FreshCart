import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
    const { products } = useAppContext()
    const { category } = useParams()
    const searchCategory = categories.find((item) => item.path.toLowerCase() === category)
    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)
    return (
        <>
            <div className='mt-16 flex flex-col md:justify-center'>
                {
                    searchCategory && (
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 relative inline-block">
                                {searchCategory.text.toUpperCase()}
                            </h2>
                        </div>
                    )
                }
                {
                    filteredProducts.length > 0 ? (
                        <div className="w-full flex justify-center mt-5 mb-10">
                            <div className='grid justify-items-center justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 sm:gap-5 md:gap-6 max-w-[1320px] mx-auto px-4 w-full'>
                                {
                                    filteredProducts.slice(0, 3).map((product) => (
                                        <div className="w-full flex justify-center">
                                            <ProductCard key={product._id} product={product} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-[60vh]'>
                            <p className='text-2xl font-medium text-green-500'>No products found in this category</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ProductCategory
