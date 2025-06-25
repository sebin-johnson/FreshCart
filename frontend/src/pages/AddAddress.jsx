import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input
        className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none text-gray-600 focus:border-green-500 transition-all duration-300 hover:border-gray-300'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
    />
)

const AddAddress = () => {
    const { axios, user, navigate } = useAppContext()
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        state: '',
        city: '',
        zipCode: '',
        country: '',
        phone: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setAddress(prev => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...address, userId: user._id };
            console.log("Sending payload:", payload);

            const { data } = await axios.post('/address/add', payload);

            toast.success(data.message);
            navigate('/cart');
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Submission failed");
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/cart')
        }
    }, [])

    return (
        <div className='mt-12 pb-16 px-4 md:px-8'>
            <h1 className='text-3xl md:text-4xl text-gray-800 font-bold mb-8'>
                Add <span className='text-green-600'>Shipping Address</span>
            </h1>

            <div className='flex flex-col md:flex-row gap-8 items-center'>
                {/* Image Section - Swapped to left */}
                <div className='md:w-1/2 lg:w-2/5'>
                    <img
                        src={assets.add_address_image}
                        className='rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300'
                        alt="Shipping illustration"
                    />
                </div>

                {/* Form Section */}
                <div className='md:w-1/2 lg:w-3/5 w-full max-w-2xl'>
                    <form onSubmit={onSubmitHandler} className='space-y-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <InputField handleChange={handleChange} address={address}
                                name='firstName' type='text' placeholder='First Name' />
                            <InputField handleChange={handleChange} address={address}
                                name='lastName' type='text' placeholder='Last Name' />
                        </div>

                        <InputField handleChange={handleChange} address={address}
                            name='email' type='email' placeholder='Email Address' />

                        <InputField handleChange={handleChange} address={address}
                            name='street' type='text' placeholder='Street Address' />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <InputField handleChange={handleChange} address={address}
                                name='city' type='text' placeholder='City' />
                            <InputField handleChange={handleChange} address={address}
                                name='state' type='text' placeholder='State/Province' />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <InputField handleChange={handleChange} address={address}
                                name='zipCode' type='number' placeholder='Zipcode' />
                            <InputField handleChange={handleChange} address={address}
                                name='country' type='text' placeholder='Country' />
                        </div>

                        <InputField handleChange={handleChange} address={address}
                            name='phone' type='tel' placeholder='Phone Number' />

                        <button className='w-full py-4 bg-green-600 text-white font-semibold rounded-lg
                            hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl
                            transform hover:-translate-y-1'>
                            Save Shipping Address
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAddress