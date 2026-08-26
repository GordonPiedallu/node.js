const product = require('../models/product.model');

exports.getproducts = (req, res) => {
    try {
        const products = product
        .find({}, 'title description')
        .sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getproduct = (req, res) => {
    const productId = req.params.id;
    product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'product not found' });
            }
            res.status(200).json(product);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
