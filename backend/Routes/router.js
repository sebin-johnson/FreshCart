import express from "express";
import { isAuth, login, logout, register } from "../Controllers/userController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = new express.Router()

router.post('/user/register', register)
router.post('/user/login', login)
router.get('/user/is-auth', authMiddleware, isAuth)
router.get('/user/logout', authMiddleware, logout)

export default router

