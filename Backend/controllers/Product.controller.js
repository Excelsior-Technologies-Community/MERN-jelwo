import Product from "../models/Product.models.js";


// CREATE PRODUCT

export const CreateProduct = async (req, res) => {
    try {
        const { name, tag, price, discount, category } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({
                message: "Missing required fields!",
            });
        }

        const imageUrl = req.files && req.files.image && req.files.image[0]
            ? `/uploads/${req.files.image[0].filename}` 
            : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60';

        const hoverImageUrl = req.files && req.files.hoverImage && req.files.hoverImage[0]
            ? `/uploads/${req.files.hoverImage[0].filename}` 
            : null;

        const product = await Product.create({
            name,
            tag,
            price,
            discount,
            category,
            imageUrl,
            hoverImageUrl,
            userId: req.user ? req.user.id : null,
        });

        return res.status(201).json({
            message: "Product added successfully!",
            product,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message,
        });
    }
};


// GET ALL PRODUCTS

export const GetProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            products,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message,
        });
    }
};


// GET SINGLE PRODUCT

export const GetProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json({
            product,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message,
        });
    }
};


// UPDATE PRODUCT

export const UpdateProducts = async (req, res) => {
    try {
        const { name, tag, price, discount, category } = req.body;

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found or Unauthorized",
            });
        }

        product.name = name ?? product.name;
        product.tag = tag ?? product.tag;
        product.price = price ?? product.price;
        product.discount = discount ?? product.discount;
        product.category = category ?? product.category;

        if (req.files) {
            if (req.files.image && req.files.image[0]) {
                product.imageUrl = `/uploads/${req.files.image[0].filename}`;
            }
            if (req.files.hoverImage && req.files.hoverImage[0]) {
                product.hoverImageUrl = `/uploads/${req.files.hoverImage[0].filename}`;
            }
        }

        await product.save();

        return res.status(200).json({
            message: "Product updated successfully!",
            product,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message,
        });
    }
};


// DELETE PRODUCT

export const DeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found or Unauthorized",
            });
        }

        await product.destroy();

        return res.status(200).json({
            message: "Product deleted successfully!",
            id: req.params.id,
        });
    } catch (e) {
        return res.status(500).json({
            message: "Server Error",
            error: e.message,
        });
    }
};