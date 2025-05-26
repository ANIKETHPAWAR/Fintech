const express = require("express");
const app = express();
const userRouter = require("./userRoutes");
const accountRoutes = require("./accountRoutes");
const router = express.Router()
const {jwtAuthMiddleware} = require('../auth')
router.use("/user",userRouter);
router.use("/account",accountRoutes)
module.exports = router;