const express = require('express');

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateStock,
    deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.patch('/:id/estoque', updateStock);
router.delete('/:id', deleteProduct);

module.exports = router;