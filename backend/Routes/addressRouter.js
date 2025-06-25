import express from 'express'
import authMiddleware from '../Middlewares/authMiddleware.js'
import { addAddress, getAddress } from '../Controllers/addressController.js'

const addressRouter = new express.Router()

addressRouter.post('/address/add', authMiddleware, addAddress)
addressRouter.get('/address/get', authMiddleware, getAddress)

export default addressRouter