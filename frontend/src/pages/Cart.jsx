import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Cart = () => {
    const { products, navigate, getCartCount, getCartAmount, removeFromCart, cartItems, updateCartData, axios, user, setCartItems } = useAppContext()
    const [cartArray, setCartArray] = useState([])
    const [addresses, setAddresses] = useState([])
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentOption, setPaymentOption] = useState('COD')
    const getCart = () => {
        let tempArray = []
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key)
            product.quantity = cartItems[key]
            tempArray.push(product)
        }
        setCartArray(tempArray)
    }
    const getUserAddress = async () => {
        try {
            // pass userId as a query param
            const { data } = await axios.get('/address/get', {
                params: { userId: user._id }
            });

            // destructure the returned object
            const { addresses } = data;

            if (Array.isArray(addresses)) {
                setAddresses(addresses);

                if (addresses.length > 0) {
                    setSelectedAddress(addresses[0]);
                }
            } else {
                toast.error(data.message || 'No addresses found');
            }
        } catch (err) {
            console.error('getUserAddress failed:', err);
            toast.error(err.response?.data?.message || err.message);
        }
    };
    const placeOrder = async () => {
        try {
            if (!selectedAddress || !selectedAddress._id) {
                return toast.error("Please select a valid address");
            }

            if (paymentOption === 'COD') {
                const { data } = await axios.post('/order/COD', {
                    userId: user._id,
                    items: cartArray.map(item => ({
                        product: item._id,
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id
                });

                if (data?.message) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/my-orders');
                } else {
                    toast.error(data?.message || "Something went wrong");
                }
            } else {
                try {
                    const { data } = await axios.post('/order/online', {
                        userId: user._id,
                        items: cartArray.map(item => ({
                            product: item._id,
                            quantity: item.quantity
                        })),
                        address: selectedAddress
                    });

                    console.log("Stripe checkout response:", data);

                    if (data?.url) {
                        window.location.replace(data.url);
                    } else {
                        toast.error(data?.message || "Something went wrong");
                    }

                } catch (error) {
                    console.error("Axios error:", error.response?.data || error.message);
                    toast.error(error.response?.data?.message || "Order failed");
                }
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || "Failed to place order");
        }
    };
    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart()
        }
    }, [products, cartItems])
    useEffect(() => {
        if (user) {
            getUserAddress()
        }
    }, [user])
    return products.length > 0 && cartItems ? (
        <>
            <div className="p-4 md:p-8 font-sans mt-10 ">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                            My Cart ({getCartCount()} Items)
                        </h3>
                        <button
                            onClick={() => {
                                navigate('/products');
                                scrollTo(0, 0);
                            }}
                            className="flex items-center space-x-2 text-gray-700 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Continue Shopping</span>
                        </button>
                    </div>

                    {/* Table Header (hidden on small) */}
                    <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-3 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg">
                        <div className="col-span-2">Product</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Total</div>
                        <div className="w-4"></div>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-8">
                        {cartArray.map((product) => (
                            <div
                                key={product._id}
                                className="grid grid-cols-6 gap-2 md:gap-4 items-center bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-100"
                            >
                                {/* Product Info */}
                                <div className="col-span-3 md:col-span-2 flex items-center space-x-3 md:space-x-4">
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer"
                                        onClick={() => {
                                            navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                            scrollTo(0, 0);
                                        }}
                                    />
                                    <div className="min-w-0">
                                        <h2 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                                            {product.name}
                                        </h2>
                                    </div>
                                </div>

                                {/* Unit Price */}
                                <div className="col-span-1 text-center md:text-left text-gray-900 font-semibold">
                                    ${product.offerPrice}
                                </div>

                                {/* Quantity Controls */}
                                <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start">
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button
                                            onClick={() => updateCartData(product._id, Math.max(1, cartItems[product._id] - 1))}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 text-gray-800 border-x border-gray-200">
                                            {cartItems[product._id]}
                                        </span>
                                        <button
                                            onClick={() => updateCartData(product._id, cartItems[product._id] + 1)}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Total & Remove */}
                                <div className="col-span-1 text-center md:text-left text-gray-900 font-semibold">
                                    ${((product.offerPrice + (product.extraPrice || 0)) * cartItems[product._id]).toFixed(2)}
                                </div>
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors justify-self-end mr-0 sm:mr-16">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Payment Method */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Payment Options */}
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Payment Method</h3>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <input type="radio" name="payment" value="COD"
                                            checked={paymentOption === 'COD'}
                                            onChange={() => setPaymentOption('COD')}
                                            className="h-5 w-5 text-green-500 focus:ring-green-500" />
                                        <div>
                                            <span className="text-gray-800 font-medium">Cash on Delivery</span>
                                        </div>
                                    </div>
                                </label>
                                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <input type="radio" name="payment" value="Online"
                                            checked={paymentOption === 'Online'}
                                            onChange={() => setPaymentOption('Online')}
                                            className="h-5 w-5 text-green-500 focus:ring-green-500" />
                                        <div>
                                            <span className="text-gray-800 font-medium">Online Payment</span>
                                        </div>
                                    </div>
                                </label>
                                <p className="text-sm font-medium uppercase mt-4">Delivery Address</p>
                                <div className="relative flex justify-between items-start mt-2">
                                    {/* Current Address */}
                                    <p className="text-gray-500">
                                        {selectedAddress
                                            ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                                            : "No address found"}
                                    </p>

                                    {/* Toggle Dropdown */}
                                    <button
                                        onClick={() => setShowAddress(!showAddress)}
                                        className="text-green-500 hover:underline cursor-pointer md:mr-5">
                                        Change
                                    </button>

                                    {/* Dropdown */}
                                    {showAddress && (
                                        <div
                                            className="absolute top-12 left-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 text-sm z-10 rounded shadow-md"
                                        >
                                            {addresses.map((address, idx) => (
                                                <p
                                                    key={idx}
                                                    onClick={() => {
                                                        setSelectedAddress(address);
                                                        setShowAddress(false);
                                                    }}
                                                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer">
                                                    {address.street}, {address.city}, {address.state}, {address.country}
                                                </p>
                                            ))}

                                            <div
                                                onClick={() => navigate("/add-address")}
                                                className="text-green-500 text-center p-2 hover:bg-indigo-500/10 cursor-pointer">
                                                + Add address
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal ({getCartCount()} items)</span>
                                    <span className="font-medium text-gray-900">${getCartAmount().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-gray-900">Free</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-gray-200">
                                    <span className="text-gray-600">Taxes</span>
                                    <span className="font-medium text-gray-900">Calculated at checkout</span>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-200 flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>${(getCartAmount()).toFixed(2)}</span>
                            </div>
                            <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg cursor-pointer" onClick={placeOrder}>
                                {paymentOption === 'COD' ? 'Place Order' : 'Proceed to Checkout'}
                            </button>
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Secure checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null
}

export default Cart
