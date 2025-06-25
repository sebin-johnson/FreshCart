import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [files, setFiles] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const { axios } = useAppContext()

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));

            files.forEach(file => {
                formData.append('images', file); // ✅ Same key as multer config
            });

            const response = await axios.post('/product/add', formData, {
                withCredentials: true // ✅ Required to send cookies
            });

            if (response.status === 200) {
                toast.success("Product added successfully");
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
            console.error("Error adding product:", error);
        }
    };


    return (
        <div className="no-scrollbar flex-1 min-h-[95vh] overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-green-500 pb-2">
                    Add New Product
                </h1>

                <form onSubmit={onSubmitHandler} className="space-y-6">
                    {/* Image Upload Section */}
                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-gray-700">Product Image</label>
                        <div className="flex flex-wrap gap-4">
                            {Array(1).fill('').map((_, index) => (
                                <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                                    <input
                                        onChange={(e) => {
                                            const updatedFiles = [...files];
                                            updatedFiles[index] = e.target.files[0];
                                            setFiles(updatedFiles);
                                        }}
                                        accept="image/*"
                                        type="file"
                                        id={`image${index}`}
                                        hidden
                                    />
                                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center hover:border-green-500 transition-colors group relative overflow-hidden">
                                        {files[index] ? (
                                            <img
                                                src={URL.createObjectURL(files[index])}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="text-center p-2">
                                                <img
                                                    src={assets.upload_area}
                                                    className="w-12 mx-auto opacity-70 group-hover:opacity-100 transition-opacity"
                                                    alt="Upload"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    placeholder="Enter product name"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    rows={4}
                                    placeholder="Describe your product..."
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white appearance-none"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.path}>{category.path}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                    <input
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Offer Price (₹)</label>
                                    <input
                                        onChange={(e) => setOfferPrice(e.target.value)}
                                        value={offerPrice}
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg cursor-pointer"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct