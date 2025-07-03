import express from 'express'
const router = express.Router();
import { post_register, post_login, get_login, get_token, logout } from '../controllers/authControllers.js';



router.get("/login", get_login)
router.get("/token", get_token)
router.post("/register", post_register)
router.post("/login", post_login)
router.post("/logout", logout)


export default router;

