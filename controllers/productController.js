// controllers/productController.js
const redisClient = require('../config/redisClient');
const ProductModel = require('../models/productModel'); // Fake DB Model standard ke liye

const getProductDetails = async (req, res) => {
    const { productId } = req.params;
    const cacheKey = `product:${productId}`;

    try {
        // Step 1: Redis Cache mein check karo (Cache Hit Check)
        const cachedProduct = await redisClient.get(cacheKey);
        
        if (cachedProduct) {
            console.log("⚡ CACHE HIT: Data Redis se mil gaya!");
            return res.json(JSON.parse(cachedProduct)); // Fauran response return kar do
        }

        // Step 2: Agar Redis mein nahi mila (Cache Miss)
        console.log("🐢 CACHE MISS: Database mein dhoond raha hoon...");
        const productFromDB = await ProductModel.findById(productId); // Main DB query

        if (!productFromDB) {
            return res.status(404).json({ message: "Product nahi mila" });
        }

        // Step 3: DB se jo data mila, uski ek copy Redis mein save karo
        // EX: 3600 ka matlab hai yeh data Redis mein 1 ghante tak save rahega (Expiration Time)
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(productFromDB));

        // Step 4: User ko response bhej do
        return res.json(productFromDB);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getProductDetails };
