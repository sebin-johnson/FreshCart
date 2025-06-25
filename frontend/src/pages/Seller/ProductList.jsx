import React from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ProductList = () => {
  const { products, axios, fetchProducts } = useAppContext()
  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post('/product/stock', { id, inStock });
      console.log("Response from toggleStock:", data);

      if (data?.success) {
        fetchProducts();
        toast.success(data.message || "Stock updated");
      } else {
        toast.error(data.message || "Failed to update stock");
      }
    } catch (error) {
      console.error('Toggle stock error:', error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex-1 min-h-[95vh] overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2">
          Product Inventory
        </h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 hidden md:table-cell">Price</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Product Cell */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 border border-gray-200 rounded-lg p-1.5 shadow-sm">
                          <img
                            src={product.image[0]}
                            alt="Product"
                            className="w-16 h-16 object-contain rounded-md"
                          />
                        </div>
                        <span className="text-gray-800 font-medium truncate max-w-[200px]">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* Category Cell */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-green-800 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>

                    {/* Price Cell */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className="text-gray-500 line-through text-sm">
                          ₹{product.price}
                        </span>
                        <span className="text-green-600 font-semibold">
                          ₹{product.offerPrice}
                        </span>
                      </div>
                    </td>

                    {/* Status Cell */}
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.inStock}
                          onChange={() => toggleStock(product._id, !product.inStock)} />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No products found</p>
              <p className="text-sm mt-2">Add new products to see them listed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList