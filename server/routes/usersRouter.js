import express from "express";
import {
    register,
    login,
    logout
} from "../controllers/userController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.post("/logout", checkToken, logout)

export default router;