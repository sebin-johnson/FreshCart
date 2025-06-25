import express from "express";
import { isSellerAuth, sellerLogin, sellerLogout } from "../Controllers/sellerController.js";
import sellerMiddleware from "../Middlewares/sellerMiddleware.js";

const sellerRouter = new express.Router()

sellerRouter.post('/seller/login', sellerLogin)
sellerRouter.get('/seller/is-auth', sellerMiddleware, isSellerAuth)
sellerRouter.get('/seller/logout', sellerLogout)

export default sellerRouter