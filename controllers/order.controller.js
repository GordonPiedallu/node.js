const Order = require("../models/order.model");
const OrderLine = require("../models/orderLine.model");
const Product = require("../models/product.model");
const Menu = require("../models/menu.model");

exports.createOrder = async (req, res) => {
    try {
        const { lines } = req.body;
        const userId = req.user.userId;

        if (!lines || !Array.isArray(lines) || lines.length === 0) {
            return res.status(400).json({ message: "La commande doit contenir au moins une ligne" });
        }

        let totalPrice = 0;
        const orderLines = [];

        for (const line of lines) {
            const { productId, menuId, quantity } = line;

            if (!quantity || quantity < 1) {
                return res.status(400).json({ message: "La quantité doit être supérieure à 0" });
            }

            if (!productId && !menuId) {
                return res.status(400).json({ message: "Un produit ou un menu est requis" });
            }

            if (productId && menuId) {
                return res.status(400).json({ message: "Une ligne ne peut pas contenir un produit et un menu" });
            }

            let item;

            if (productId) {
                item = await Product.findById(productId);
            } else {
                item = await Menu.findById(menuId);
            }

            if (!item) {
                return res.status(404).json({ message: "Produit ou menu non trouvé" });
            }

            const lineTotal = item.price * quantity;

            totalPrice += lineTotal;

            orderLines.push({
                product: productId || undefined,
                menu: menuId || undefined,
                quantity,
                unitPrice: item.price,
                totalPrice: lineTotal
            });
        }

        const order = await Order.create({
            user: userId,
            totalPrice
        });

        const linesToCreate = orderLines.map(line => ({
            ...line,
            order: order._id
        }));

        await OrderLine.insertMany(linesToCreate);

        const createdOrder = await Order.findById(order._id).populate("user", "name email");

        const createdLines = await OrderLine.find({ order: order._id })
            .populate("product", "title description image price")
            .populate("menu", "name description image size price");

        res.status(201).json({
            order: createdOrder,
            lines: createdLines
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        const result = [];

        for (const order of orders) {
            const lines = await OrderLine.find({ order: order._id })
                .populate("product", "title description image price")
                .populate("menu", "name description image size price");

            result.push({
                order,
                lines
            });
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findById(orderId)
            .populate("user", "name email");

        if (!order) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        const lines = await OrderLine.find({ order: orderId })
            .populate("product", "title description image price")
            .populate("menu", "name description image size price");

        res.status(200).json({
            order,
            lines
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        await OrderLine.deleteMany({ order: orderId });

        res.status(200).json({
            message: "Commande supprimée avec succès"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};