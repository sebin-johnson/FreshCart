import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
    const { products } = useAppContext()

    return (
        <section className="mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block">
                    Best Sellers
                </h2>
            </div>

            {/* Products Grid */}
            <div className="grid justify-items-center justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 sm:gap-5 md:gap-6 max-w-[1320px] mx-auto px-4 w-full">
                {products
                    .filter(product => product.inStock)
                    .slice(0, 4)
                    .map((product, index) => (
                        <div className="flex justify-center" key={index}>
                            <ProductCard product={product} />
                        </div>
                    ))}
            </div>
        </section>
    )
}

export default BestSeller