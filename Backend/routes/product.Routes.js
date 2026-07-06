import express from "express";
import {CreateProduct,GetProducts,GetProductById,UpdateProducts,DeleteProduct} from "../controllers/Product.controller.js";
import {protectAdmin} from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router=express.Router();

router.get("/",GetProducts);
router.get("/:id",GetProductById);
router.post("/",protectAdmin,upload.single("image"),CreateProduct);
router.put("/:id",protectAdmin,upload.single("image"),UpdateProducts);
router.delete("/:id",protectAdmin,DeleteProduct);

export default router;