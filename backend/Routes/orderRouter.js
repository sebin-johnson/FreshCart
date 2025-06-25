import express from 'express'
import authMiddleware from '../Middlewares/authMiddleware.js'
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderOnline } from '../Controllers/orderController.js'
import sellerMiddleware from '../Middlewares/sellerMiddleware.js'

const orderRouter = new express.Router()

orderRouter.post('/order/COD', authMiddleware, placeOrderCOD)
orderRouter.get('/order/user', authMiddleware, getUserOrders)
orderRouter.get('/order/seller', sellerMiddleware, getAllOrders)
orderRouter.post('/order/online', authMiddleware, placeOrderOnline)

export default orderRouter