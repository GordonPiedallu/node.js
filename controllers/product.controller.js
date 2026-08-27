const product = require("../models/product.model");

exports.createProduct = async (req, res) => {
    try {
        const { title, description, image, price } = req.body;

        const newProduct = await product.create({
            title,
            description,
            image,
            price
        });

        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getproducts = async (req, res) => {
    try {
        const products = await product
            .find({}, "title description image price")
            .sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getproduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const foundProduct = await product.findById(productId);

        if (!foundProduct) {
            return res.status(404).json({
                message: "Produit non trouvé"
            });
        }

        res.status(200).json(foundProduct);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateproduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, image, price } = req.body;

        const updatedProduct = await product.findByIdAndUpdate(
            productId,
            { title, description, image, price },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Produit non trouvé"
            });
        }

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteproduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Produit non trouvé"
            });
        }

        res.status(200).json({
            message: "Produit supprimé avec succès"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
