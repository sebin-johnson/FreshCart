import express from 'express'
import { updateCart } from '../Controllers/cartController.js'

const cartRouter = new express.Router()

cartRouter.post('/cart/update', updateCart)

export default cartRouter