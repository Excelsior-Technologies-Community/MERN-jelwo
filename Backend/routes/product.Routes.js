import express from "express";
import {CreateProduct,GetProducts,GetProductById,UpdateProducts,DeleteProduct} from "../controllers/Product.controller.js";
import upload from "../middleware/upload.middleware.js";

const router=express.Router();

router.get("/",GetProducts);
router.get("/:id",GetProductById);
router.post("/",upload.single("image"),CreateProduct);
router.put("/:id",upload.single("image"),UpdateProducts);
router.delete("/:id",DeleteProduct);

export default router;