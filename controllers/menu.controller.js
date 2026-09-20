const Menu = require("../models/menu.model");
const MenuLine = require("../models/menuLine.model");

exports.createMenu = async (req, res) => {
    try {
        const { name, description, image, size, price, products } = req.body;

        const menu = await Menu.create({
            name,
            description,
            image,
            size,
            price
        });

        if (products && Array.isArray(products)) {
            const menuLines = products.map(product => ({
                menu: menu._id,
                product: product.productId,
                quantity: product.quantity || 1
            }));

            await MenuLine.insertMany(menuLines);
        }

        const lines = await MenuLine.find({ menu: menu._id })
            .populate("product", "title description image price");

        res.status(201).json({
            menu,
            products: lines
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().sort({ createdAt: -1 });

        const result = [];

        for (const menu of menus) {
            const products = await MenuLine.find({ menu: menu._id })
                .populate("product", "title description image price");

            result.push({
                menu,
                products
            });
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMenu = async (req, res) => {
    try {
        const menuId = req.params.id;

        const menu = await Menu.findById(menuId);

        if (!menu) {
            return res.status(404).json({
                message: "Menu non trouvé"
            });
        }

        const products = await MenuLine.find({ menu: menuId })
            .populate("product", "title description image price");

        res.status(200).json({
            menu,
            products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const { name, description, image, size, price, products } = req.body;

        const updatedMenu = await Menu.findByIdAndUpdate(
            menuId,
            { name, description, image, size, price },
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({
                message: "Menu non trouvé"
            });
        }

        if (products && Array.isArray(products)) {
            await MenuLine.deleteMany({ menu: menuId });

            const menuLines = products.map(product => ({
                menu: menuId,
                product: product.productId,
                quantity: product.quantity || 1
            }));

            await MenuLine.insertMany(menuLines);
        }

        const lines = await MenuLine.find({ menu: menuId })
            .populate("product", "title description image price");

        res.status(200).json({
            menu: updatedMenu,
            products: lines
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMenu = async (req, res) => {
    try {
        const menuId = req.params.id;

        const deletedMenu = await Menu.findByIdAndDelete(menuId);

        if (!deletedMenu) {
            return res.status(404).json({
                message: "Menu non trouvé"
            });
        }

        await MenuLine.deleteMany({ menu: menuId });

        res.status(200).json({
            message: "Menu supprimé avec succès"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};