import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
    const { products, searchQuery } = useAppContext()
    const [filterdProducts, setFilterdProducts] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilterdProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setFilterdProducts(products)
        }
    }, [products, searchQuery])

    return (
        <>
            <div className="mt-16 px-4 sm:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 relative inline-block">
                        All Products
                    </h2>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10 mb-10">
                <div className="grid justify-items-center justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 sm:gap-5 md:gap-6 max-w-[1320px] mx-auto px-4 w-full">
                    {filterdProducts
                        .filter((product) => product.inStock)
                        .map((product, index) => (
                            <div className="w-full flex justify-center">
                                <ProductCard key={index} product={product} />
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default AllProducts
