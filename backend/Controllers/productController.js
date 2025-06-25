import { Readable } from 'stream';
import { v2 as cloudinary } from "cloudinary";
import Product from "../Models/productSchema.js";

// add product
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        const images = req.files;

        if (!images || images.length === 0) {
            return res.status(400).json({ message: "Missing images" });
        }

        const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'products' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }
                );
                Readable.from(buffer).pipe(stream);
            });
        };

        const imageUrls = await Promise.all(
            images.map(file => uploadToCloudinary(file.buffer))
        );

        const product = await Product.create({
            ...productData,
            image: imageUrls
        });

        res.status(200).json({ message: "Product added", product });
    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// get all product
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "Products fetched", products }); // ✅
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error });
    }
};

// get single product
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.status(201).json(product)
    } catch (error) {
        res.status(409).json(error)
    }
}

// change stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        return res.status(200).json({ success: true, message: 'Stock updated' });
    } catch (error) {
        console.error('Error updating stock:', error);
        return res.status(500).json({ success: false, message: 'Failed to update stock' });
    }
};
