import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './DB/connection.js';
import 'dotenv/config'
import router from './Routes/router.js';
import sellerRouter from './Routes/sellerRouter.js';
import cloudinaryConnect from './DB/cloudinary.js';
import productRouter from './Routes/productRouter.js';
import cartRouter from './Routes/cartRouter.js';
import addressRouter from './Routes/addressRouter.js';
import orderRouter from './Routes/orderRouter.js';
import { stripeWebhooks } from './Controllers/orderController.js';

const app = express()
const port = process.env.PORT || 4000

await connectDB()
await cloudinaryConnect()

// allow multiple origins
const allowedOrigins = ['http://localhost:5173']

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhooks);

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.get('/', (req, res) => res.send("API is working"))
app.use(router)
app.use(sellerRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(addressRouter)
app.use(orderRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})