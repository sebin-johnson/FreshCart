import express from 'express'
import { upload } from '../DB/multer.js'
import { addProduct, changeStock, getAllProducts, getSingleProduct } from '../Controllers/productController.js'
// import authMiddleware from '../Middlewares/authMiddleware.js'
import sellerMiddleware from '../Middlewares/sellerMiddleware.js'

const productRouter = new express.Router()

productRouter.post('/product/add', upload.array('images'), sellerMiddleware, addProduct)
productRouter.get('/product/list', getAllProducts)
productRouter.get('/product/id', getSingleProduct)
productRouter.post('/product/stock', sellerMiddleware, changeStock)

export default productRouter