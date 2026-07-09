import express from "express";
import {CreateProduct,GetProducts,GetProductById,UpdateProducts,DeleteProduct} from "../controllers/Product.controller.js";
import upload from "../middleware/upload.middleware.js";

const router=express.Router();

router.get("/",GetProducts);
router.get("/:id",GetProductById);
router.post("/", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'hoverImage', maxCount: 1 }]), CreateProduct);
router.put("/:id", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'hoverImage', maxCount: 1 }]), UpdateProducts);
router.delete("/:id",DeleteProduct);

export default router;