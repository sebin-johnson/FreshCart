import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './DB/connection.js';
import cloudinaryConnect from './DB/cloudinary.js';

import router from './Routes/router.js';
import sellerRouter from './Routes/sellerRouter.js';
import productRouter from './Routes/productRouter.js';
import cartRouter from './Routes/cartRouter.js';
import addressRouter from './Routes/addressRouter.js';
import orderRouter from './Routes/orderRouter.js';

import { stripeWebhooks } from './Controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to DBs
await connectDB();
await cloudinaryConnect();

// ✅ Stripe webhook route — must come BEFORE express.json()
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// ✅ Normal middleware (after Stripe route)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// ✅ App routes
app.get('/', (req, res) => res.send("API is working"));

app.use(router);
app.use(sellerRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(addressRouter);
app.use(orderRouter);

// ✅ Server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
