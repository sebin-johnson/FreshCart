import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { axios } = useAppContext()

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/order/seller');
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.warn("Unexpected data format:", data);
        setOrders([]);
      }
    } catch (error) {
      console.log("Orders fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='flex-1 min-h-[95vh] overflow-y-auto p-6 bg-gray-50'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2'>
          Order Management
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 py-10">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className='text-center py-12'>
            <img
              src={assets.empty_order}
              alt="No orders"
              className='w-48 mx-auto mb-6 opacity-75'
            />
            <p className='text-gray-600 text-lg'>No orders found</p>
            <p className='text-gray-500 text-sm mt-2'>New orders will appear here</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6'
              >
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 items-start'>
                  {/* Order Items */}
                  <div className='lg:col-span-2 space-y-3'>
                    <div className='flex items-center gap-3 mb-3'>
                      <img
                        className='w-10 h-10 object-contain p-1.5 bg-green-100 rounded-lg'
                        src={assets.box_icon}
                        alt="package"
                      />
                      <span className='font-semibold text-gray-700'>
                        Order #{index + 1}
                      </span>
                    </div>

                    {order?.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                      >
                        <div>
                          <p className='font-medium text-gray-800'>
                            {item?.product?.name || "Product name"}
                          </p>
                          <p className='text-sm text-gray-500'>
                            Quantity: {item?.quantity}
                          </p>
                        </div>
                        <span className='text-green-600 font-medium'>
                          ₹{(item?.product?.offerPrice || 0) * item?.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className='flex flex-col items-center justify-center lg:col-span-2'>
                    <div className='space-y-2 text-sm'>
                      <h3 className='font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Shipping Details
                      </h3>
                      <p className='text-gray-600'>
                        {order?.address?.firstName} {order?.address?.lastName}
                      </p>
                      <p className='text-gray-600'>
                        {order?.address?.street}, {order?.address?.city}
                      </p>
                      <p className='text-gray-600'>
                        {order?.address?.state} - {order?.address?.zipcode}
                      </p>
                      <p className='text-gray-600'>
                        {order?.address?.country}
                      </p>
                      <p className='text-gray-600 flex items-center gap-2 mt-2 justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {order?.address?.phone}
                      </p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className='lg:col-span-1 ml-auto text-right'>
                    <div className='bg-green-50 p-4 rounded-lg'>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='font-semibold text-gray-700'>Total Amount:</span>
                        <span className='text-xl font-bold text-green-600 ml-2'>₹{order?.amount || 0}</span>
                      </div>

                      <div className='flex flex-wrap gap-2 justify-end'>
                        <span className={`px-3 py-1 rounded-full text-sm min-w-[120px] text-center ${order?.isPaid
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {order?.isPaid ? 'Paid' : 'Payment Pending'}
                        </span>
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm min-w-[120px] text-center'>
                          {order?.paymentType || "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div className='text-sm text-gray-600 space-y-1 mt-3'>
                      <p className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Ordered: {new Date(order?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
