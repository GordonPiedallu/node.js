const Menu = require("../models/menu.model");

exports.createMenu = async (req, res) => {
    try {
        const { name, description, image, size, price } = req.body;

        const newMenu = await Menu.create({
            name,
            description,
            image,
            size,
            price
        });

        res.status(201).json(newMenu);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu
            .find({}, "name description image size price")
            .sort({ createdAt: -1 });

        res.status(200).json(menus);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getMenu = async (req, res) => {
    try {
        const menuId = req.params.id;

        const foundMenu = await Menu.findById(menuId);

        if (!foundMenu) {
            return res.status(404).json({
                message: "Menu non trouvé"
            });
        }

        res.status(200).json(foundMenu);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const { name, description, image, size, price } = req.body;

        const updatedMenu = await Menu.findByIdAndUpdate(
            menuId,
            { name, description, image, size, price },
            { new: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({
                message: "Menu non trouvé"
            });
        }

        res.status(200).json(updatedMenu);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
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

        res.status(200).json({
            message: "Menu supprimé avec succès"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};