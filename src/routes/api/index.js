import { Router } from "express";
import products from "./products"
import carts from "./carts"

const router = Router()

router.use("/products", products)
router.use("/carts",carts)

export default router