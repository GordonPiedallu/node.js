const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
    try {
        const { productId, quantity, totalPrice } = req.body;
        const userId = req.user.id;

        const newOrder = await Order.create({
            product: productId,
            quantity,
            totalPrice,
            user: userId
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order
            .find({}, "product quantity totalPrice status")
            .populate("product", "title description image price")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const foundOrder = await Order.findById(orderId)
            .populate("product", "title description image price");

        if (!foundOrder) {
            return res.status(404).json({
                message: "Commande non trouvée"
            });
        }

        res.status(200).json(foundOrder);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { productId, quantity, totalPrice, status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { product: productId, quantity, totalPrice, status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Commande non trouvée"
            });
        }

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({
                message: "Commande non trouvée"
            });
        }

        res.status(200).json({
            message: "Commande supprimée avec succès"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
