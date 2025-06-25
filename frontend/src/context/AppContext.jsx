import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from 'react-hot-toast';
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.VITE_CURRENCY
    const navigate = useNavigate()
    const [user, setUser] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState([])
    // fetch seller
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/seller/is-auth')
            if (data) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    // fetch user 
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/user/is-auth', {
                withCredentials: true 
            });
            if (data.message) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null);
        }
    };

    // to fetch products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/product/list');
            if (data.products && data.products.length > 0) {
                setProducts(data.products);
            } else {
                toast.error('No products found');
            }
        } catch (error) {
            toast.error(error.message || 'Error fetching products');
        }
    };

    // add to cart
    const addToCart = (itemId) => {
        const cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success('Added to cart')
    }
    // update cart data
    const updateCartData = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity
        setCartItems(cartData)
        toast.success('Cart updated')
    }
    // delete a cart item
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        toast.success('Removed from cart')
        setCartItems(cartData)
    }
    // get caet item count
    const getCartCount = () => {
        let totalCount = 0
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount
    }
    // get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100
    }

    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()
    }, [])

    useEffect(() => {
        const updateCart = async () => {
            try {
                console.log("Sending cartItems:", cartItems); // Confirm format
                const { data } = await axios.post('/cart/update', {
                    userId: user._id,
                    cartItems // this is an object now
                });

                if (!data) {
                    toast.error("Cart update failed");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        };

        if (user && Object.keys(cartItems).length > 0) {
            updateCart();
        }
    }, [cartItems]);


    const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartData, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount, axios, fetchProducts, setCartItems }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}